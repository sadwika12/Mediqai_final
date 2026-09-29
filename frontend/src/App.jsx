import React, { useState, useEffect, useRef } from 'react';
import { SplashScreen, TopBar, Sidebar, Footer, AuthPrompt, BackButton } from './components/common.jsx';
import { ScrollTopButton } from './components/motion.jsx';
import './styles.css';
import { useT } from './data/translations.js';
import { diseaseById, DISEASES } from './data/diseases.js';
import { computePrediction, rankDiseases } from './engine/prediction.js';
import { LS, lsGet, lsSet, uid, seedIfNeeded } from './utils/storage.js';
import { LoginPage, SignupPage } from './pages/Auth.jsx';
import LandingPage from './pages/LandingPage.jsx';
import {
  DiseaseGrid, DiseaseDetailInput, ReviewScreen, AnalyzingScreen, ResultScreen, WelcomeScreen,
  UnsureInput, UnsureResult
} from './pages/DiseaseFlow.jsx';
import { HistoryPage, SettingsPage, HelpSupportPage } from './pages/UserPages.jsx';
import SymptomsPage from './pages/SymptomsPage.jsx';
import HealthInfoPage from './pages/HealthInfoPage.jsx';
import HealthyLivingPage from './pages/HealthyLivingPage.jsx';
import { DoctorQueuePage, DoctorHistoryPage } from './pages/DoctorPages.jsx';
import { AdminOverviewPage, AdminFeedbackPage, AdminUsersPage } from './pages/AdminPages.jsx';
const FLOW_PAGES = ['home','chatbot','form','upload'];
const DEFAULT_PAGE = {user:'home', doctor:'doctorqueue', admin:'adminoverview'};

function App(){
  const [showSplash,setShowSplash] = useState(true);
  // Light / dark theme: saved choice first, otherwise follow the device setting.
  const [theme,setTheme] = useState(()=>{
    const saved = lsGet('mediqai_theme',null);
    if(saved==='light' || saved==='dark') return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  });
  const [lang,setLang] = useState(()=> lsGet('mediqai_lang','en'));
  const [users,setUsers] = useState(()=>{ seedIfNeeded(); return lsGet(LS.users,[]); });
  const [records,setRecords] = useState(()=> lsGet(LS.records,[]));
  const [user,setUser] = useState(()=>{
    const sid = lsGet(LS.session,null);
    const list = lsGet(LS.users,[]);
    return sid ? (list.find(u=>u.id===sid)||null) : null;
  });
  const [authView,setAuthView] = useState('landing'); // landing | login | signup
  const [authPrompt,setAuthPrompt] = useState(null); // {type:'role'|'disease', payload}
  const [pendingDiseaseId,setPendingDiseaseId] = useState(null);
  const [defaultSignupRole,setDefaultSignupRole] = useState('user');
  const [signupNotice,setSignupNotice] = useState(false);
  const [page,setPage] = useState(()=> user ? DEFAULT_PAGE[user.role] : 'home');
  const [userFlow,setUserFlow] = useState({step: user && user.role==='user' ? 'welcome' : 'grid'});
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [settingsSaved,setSettingsSaved] = useState(false);
  // Back-button history: snapshots of {page, userFlow}. See "Navigation" below.
  const [navStack,setNavStack] = useState([]);
  // Id of the "analysing…" run the user is currently waiting on (see runAnalysis).
  const runId = useRef(0);
  const t = useT(lang);

  useEffect(()=>{ const tm = setTimeout(()=>setShowSplash(false), 2600); return ()=>clearTimeout(tm); },[]);
  useEffect(()=>{ lsSet('mediqai_lang', lang); document.documentElement.lang = lang; },[lang]);
  useEffect(()=>{ window.scrollTo(0,0); },[page, userFlow.step, authView]);
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); },[theme]);

  function toggleTheme(){
    const next = theme==='dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-anim');            // brief cross-fade of colours
    setTimeout(()=>root.classList.remove('theme-anim'), 450);
    setTheme(next);
    lsSet('mediqai_theme', next);
  }

  function persistUsers(list){ setUsers(list); lsSet(LS.users,list); }
  function persistRecords(list){ setRecords(list); lsSet(LS.records,list); }
  // A patient can only delete their own screenings.
  function deleteRecord(recId){ persistRecords(records.filter(r=> !(r.id===recId && r.userId===user.id))); }

  function handleLogin(u){
    setUser(u); lsSet(LS.session,u.id); setPage(DEFAULT_PAGE[u.role]);
    setSignupNotice(false);
    setNavStack([]);
    if(pendingDiseaseId && u.role==='user'){ setUserFlow(diseaseFlow(pendingDiseaseId)); setPendingDiseaseId(null); }
    else setUserFlow(rootFlow(u));
  }
  function handleLogout(){ runId.current++; setUser(null); lsSet(LS.session,null); setAuthView('landing'); setSidebarOpen(false); setNavStack([]); }

  // Feature 2: signup no longer logs the person straight in — it sends them
  // to the login screen with a "your account is ready" notice instead.
  function handleSignup(newUser){
    const list=[...users,newUser];
    persistUsers(list);
    setDefaultSignupRole(newUser.role);
    setSignupNotice(true);
    setAuthView('login');
  }

  function updateUser(patch){
    const merged = {...user, ...patch};
    setUser(merged);
    lsSet(LS.session, merged.id);
    persistUsers(users.map(u=> u.id===merged.id ? merged : u));
    setSettingsSaved(true);
    setTimeout(()=>setSettingsSaved(false), 2800);
  }

  /* ============================== Navigation ==============================
     Rules (so Back always behaves the same way):
       1. Going forward pushes the screen you are leaving onto `navStack`.
       2. Back pops it. With nothing left to pop, Back goes Home.
       3. The root screen (patient Home, or a doctor's / admin's landing page)
          never shows Back, and reaching it clears the stack.
       4. The "analysing…" spinner is never pushed and never shows Back. */
  const isAnalyzing = FLOW_PAGES.includes(page) && userFlow.step==='analyzing';
  const rootFlow = (u)=>({step: u.role==='user' ? 'welcome' : 'grid'});
  const diseaseFlow = (diseaseId, method='form', selected=[])=>({step:'input', diseaseId, method, selected, chatDone:false});
  const unsureFlow = (method)=>({step:'uinput', method, selected:[], chatDone:false});

  function navigate(nextPage, nextFlow){
    runId.current++;                                  // stop waiting on any pending analysis
    if(!isAnalyzing) setNavStack(s=>[...s, {page, userFlow}]);
    setPage(nextPage); setUserFlow(nextFlow); setSidebarOpen(false);
  }
  function goHome(){
    runId.current++;
    if(user){ setPage(DEFAULT_PAGE[user.role]); setUserFlow(rootFlow(user)); setSidebarOpen(false); }
    else setAuthView('landing');
    setNavStack([]);
  }
  function goBack(){
    const prev = navStack[navStack.length-1];
    if(!prev){ goHome(); return; }
    runId.current++;
    setNavStack(navStack.slice(0,-1));
    setPage(prev.page); setUserFlow(prev.userFlow); setSidebarOpen(false);
  }
  function goPage(p){
    setSidebarOpen(false);
    if(p==='home' || (user && p===DEFAULT_PAGE[user.role])){ goHome(); return; }
    const nextFlow = (p==='chatbot' || p==='upload') ? unsureFlow(p) : p==='form' ? {step:'grid'} : userFlow;
    if(p===page && nextFlow.step===userFlow.step) return;      // already on this screen
    navigate(p, nextFlow);
  }

  function goExplore(){ navigate('home', {step:'grid'}); }
  function openDisease(diseaseId, method, preselected){ navigate('home', diseaseFlow(diseaseId, method, preselected)); }
  function startUnsure(method){ navigate(page, unsureFlow(method)); }
  function proceedToReview(){ navigate(page, {...userFlow, step:'review'}); }

  function onSelectRole(role){
    if(user){ goHome(); }
    else { setDefaultSignupRole(role==='doctor' ? 'doctor' : 'user'); setAuthPrompt({type:'role', payload:role}); }
  }
  function onSelectDisease(diseaseId){
    if(user && user.role==='user') openDisease(diseaseId);
    else if(user) goHome();
    else { setPendingDiseaseId(diseaseId); setAuthPrompt({type:'disease', payload:diseaseId}); }
  }

  function closeAuthPrompt(){ setAuthPrompt(null); }
  function authPromptToLogin(){ setAuthView('login'); setAuthPrompt(null); }
  function authPromptToSignup(){ setAuthView('signup'); setAuthPrompt(null); }

  function setFlowMethod(m){ setUserFlow(f=>({...f, method:m, selected: m==='chatbot'? [] : f.selected, chatDone:false})); }
  function setFlowSelected(sel){ setUserFlow(f=>({...f, selected: typeof sel==='function'? sel(f.selected): sel})); }
  function setFlowChatDone(v){ setUserFlow(f=>({...f, chatDone:v})); }

  function addRecord(rec){
    setRecords(prev=>{ const list=[rec, ...prev]; lsSet(LS.records, list); return list; });
  }
  /* Shows the "analysing…" screen for a moment, then the result. The record is
     always saved, but the screen only advances if the user is still waiting on
     this run (leaving or going Back cancels the advance, not the record). */
  function runAnalysis(flow, record, nextFlow){
    const id = ++runId.current;
    setUserFlow({...flow, step:'analyzing'});
    setTimeout(()=>{
      if(record) addRecord(record);
      if(runId.current!==id) return;
      setNavStack([]);                                 // the flow is finished: Back now means Home
      setUserFlow(nextFlow);
    }, 1900);
  }
  function runPredict(){
    const flow = userFlow;
    const result = computePrediction(disease, flow.selected);
    runAnalysis(flow,
      { id:uid('rec'), userId:user.id, userName:user.name, diseaseId:flow.diseaseId, inputMethod:flow.method,
        selectedIds:flow.selected, result, timestamp:Date.now(), doctorReview:null },
      {...flow, step:'result', result});
  }
  // "Not sure what I have" flow: rank every condition, save the best match.
  function runUnsurePredict(){
    const {selected, method} = userFlow;
    const ranked = rankDiseases(DISEASES, selected);
    const best = ranked[0];
    runAnalysis(userFlow,
      best ? { id:uid('rec'), userId:user.id, userName:user.name, diseaseId:best.disease.id, inputMethod:method,
        selectedIds:selected, result:best.result, timestamp:Date.now(), doctorReview:null, startedUnsure:true,
        alsoConsidered: ranked.slice(1,4).map(r=>({diseaseId:r.disease.id, score:r.result.score, riskLevel:r.result.riskLevel})) } : null,
      {step:'uresult', method, selected,
        ranked: ranked.map(r=>({diseaseId:r.disease.id, result:r.result, hitIds:r.hits.map(h=>h.id)}))});
  }

  function saveDoctorReview(recId, review){
    const list = records.map(r=> r.id===recId ? {...r, doctorReview:review} : r);
    persistRecords(list);
  }

  const disease = userFlow.diseaseId ? diseaseById(userFlow.diseaseId) : null;

  /* ---------- Not logged in ---------- */
  if(!user){
    if(authView==='login') return <LoginPage t={t} lang={lang} users={users} onLogin={handleLogin} onSwitchSignup={()=>{setSignupNotice(false);setAuthView('signup');}} onBack={()=>{setSignupNotice(false);setAuthView('landing');}} notice={signupNotice}/>;
    if(authView==='signup') return <SignupPage t={t} lang={lang} users={users} onSignup={handleSignup} onSwitchLogin={()=>setAuthView('login')} onBack={()=>setAuthView('landing')} defaultRole={defaultSignupRole}/>;
    return (
      <React.Fragment>
        <SplashScreen show={showSplash}/>
        {authPrompt && <AuthPrompt t={t} onClose={closeAuthPrompt} onLogin={authPromptToLogin} onSignup={authPromptToSignup}/>}
        <TopBar lang={lang} setLang={setLang} t={t} user={null} onGoHome={goHome} onLogin={()=>setAuthView('login')} onSignup={()=>setAuthView('signup')} theme={theme} onToggleTheme={toggleTheme}/>
        <LandingPage t={t} lang={lang} onGetStarted={()=>setAuthView('signup')} onGoInfo={()=>{
          document.getElementById('mq-public-info') && document.getElementById('mq-public-info').scrollIntoView({behavior:'smooth'});
        }} onSelectDisease={onSelectDisease} ready={!showSplash}/>
        <Footer t={t} lang={lang} onGoHome={goHome} onNav={()=>setAuthPrompt({type:'nav'})}/>
        <ScrollTopButton label={t('backToTop')}/>
      </React.Fragment>

    );
  }

  /* ---------- Logged in shell ---------- */
  let content = null;
  if(page==='settings'){
    content = <SettingsPage user={user} lang={lang} t={t} onSave={updateUser} saved={settingsSaved} onLogout={handleLogout}/>;
  } else if(user.role==='user'){
    if(FLOW_PAGES.includes(page)){
      if(userFlow.step==='welcome') content = <WelcomeScreen t={t} lang={lang} user={user} records={records} onExplore={goExplore} onQuickSelect={(id)=>openDisease(id)} onQuickAction={(pageKey)=>goPage(pageKey)} onGoTips={()=>goPage('tips')} ready={!showSplash}/>;
      else if(userFlow.step==='grid') content = <DiseaseGrid t={t} lang={lang} onSelect={(id)=>openDisease(id)} onUnsure={startUnsure}/>;
      else if(userFlow.step==='uinput') content = (
        <UnsureInput lang={lang} t={t} method={userFlow.method} setMethod={setFlowMethod}
          selected={userFlow.selected} setSelected={setFlowSelected} chatDone={userFlow.chatDone} setChatDone={setFlowChatDone}
          onProceed={runUnsurePredict}/>
      );
      else if(userFlow.step==='uresult') content = (
        <UnsureResult ranked={userFlow.ranked||[]} lang={lang} t={t}
          onCheckDetail={(id, hitIds)=>openDisease(id,'form',hitIds)}
          onNewCheck={()=>goPage('home')} onViewHistory={()=>goPage('history')}/>
      );
      else if(userFlow.step==='input') content = (
        <DiseaseDetailInput disease={disease} lang={lang} t={t} method={userFlow.method} setMethod={setFlowMethod}
          selected={userFlow.selected} setSelected={setFlowSelected} chatDone={userFlow.chatDone} setChatDone={setFlowChatDone}
          onProceed={proceedToReview}/>
      );
      else if(userFlow.step==='review') content = (
        <ReviewScreen disease={disease} lang={lang} t={t} method={userFlow.method} selected={userFlow.selected}
          onEdit={goBack} onPredict={runPredict}/>
      );
      else if(userFlow.step==='analyzing') content = <AnalyzingScreen t={t}/>;
      else if(userFlow.step==='result') content = (
        <ResultScreen disease={disease} lang={lang} t={t} result={userFlow.result}
          onNewCheck={()=>goPage('home')} onViewHistory={()=>goPage('history')}/>
      );
    }
    else if(page==='history') content = <HistoryPage records={records} lang={lang} t={t} userId={user.id} onDelete={deleteRecord}/>;
    else if(page==='healthinfo') content = <HealthInfoPage lang={lang}/>;
    else if(page==='tips') content = <HealthyLivingPage lang={lang}/>;
    else if(page==='symptomsguide') content = <SymptomsPage lang={lang} t={t} onCheck={(id)=>openDisease(id)} onGuide={()=>goPage('healthinfo')}/>;
    else if(page==='help') content = <HelpSupportPage lang={lang} t={t}/>;
  } else if(user.role==='doctor'){
    if(page==='doctorqueue') content = <DoctorQueuePage records={records} lang={lang} t={t} doctor={user} onSaveReview={saveDoctorReview}/>;
    else if(page==='doctorhistory') content = <DoctorHistoryPage records={records} lang={lang} t={t} doctor={user}/>;
  } else if(user.role==='admin'){
    if(page==='adminoverview') content = <AdminOverviewPage records={records} lang={lang} t={t}/>;
    else if(page==='adminfeedback') content = <AdminFeedbackPage records={records} lang={lang} t={t}/>;
    else if(page==='adminusers') content = <AdminUsersPage users={users} lang={lang} t={t}/>;
  }

  const isHomeWelcome = user.role==='user' && page==='home' && userFlow.step==='welcome';
  // Back is shown on every screen except the root one and the transient spinner.
  const atRoot = user.role==='user' ? (page==='home' && userFlow.step==='welcome') : page===DEFAULT_PAGE[user.role];
  const showGlobalBack = !atRoot && !isAnalyzing;
  // Narrow, centred columns for the account-style pages so nothing hugs the left edge.
  const widthClass = page==='settings' ? ' main-content-sm'
    : user.role!=='user' ? ''
    : page==='help' || (FLOW_PAGES.includes(page) && (userFlow.step==='uinput' || userFlow.step==='uresult')) ? ' main-content-md'
    : page==='history' ? ' main-content-lg' : '';

  return (
    <React.Fragment>
      <SplashScreen show={showSplash}/>
      <div className="app-shell app-shell-col">
        <TopBar lang={lang} setLang={setLang} t={t} user={user} onGoHome={goHome}
          onToggleSidebar={()=>setSidebarOpen(o=>!o)} onQuickSearchSelect={(id)=>openDisease(id)}
          records={records} onOpenHistory={()=>goPage('history')}
          theme={theme} onToggleTheme={toggleTheme} onOpenSettings={()=>goPage('settings')} onLogout={handleLogout}/>
        <div className="app-body">
          <div className={"sidebar-backdrop"+(sidebarOpen?" open":"")} onClick={()=>setSidebarOpen(false)}/>
          <Sidebar role={user.role} page={page} setPage={goPage} t={t} open={sidebarOpen}
            user={user} onOpenSettings={()=>goPage('settings')} onLogout={handleLogout} onClose={()=>setSidebarOpen(false)}/>
          <div className={"main-content"+(isHomeWelcome?" main-content-full":"")+widthClass}>
            {showGlobalBack && <BackButton t={t} onClick={goBack}/>}
            {content}
          </div>
        </div>
        <Footer t={t} lang={lang} onGoHome={goHome} onNav={goPage}/>
      </div>
      <ScrollTopButton label={t('backToTop')}/>
    </React.Fragment>
  );
}

export default App;
