import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  IconHome, IconHistory, IconInfo, IconTips, IconSymptoms, IconChat, IconForm,
  IconUpload, IconUser, IconDoctor, IconAdmin, IconLogout, IconGlobe, IconBell,
  IconCheck, IconMenu, IconActivity, IconUsers, IconClipboard, IconSearch, IconSettings,
  IconHeart, IconBook, IconMicroscope, IconHelp, IconX, IconArrowL,
  IconSun, IconMoon, IconChevronDown
} from './icons.jsx';
import { LANGS } from '../data/translations.js';
import { RISK_COLOR } from '../engine/prediction.js';
import { DISEASES } from '../data/diseases.js';

function SplashScreen({show}){
  return (
    <div className={"splash-wrap" + (show? "":" hide")}>
      <div className="splash-stage">
        <svg className="splash-stetho" width="180" height="150" viewBox="0 0 180 150">
          <path d="M40 10v40a35 35 0 0 0 70 0V10" />
          <path d="M75 95a42 42 0 0 0 42-42V38" />
          <circle cx="140" cy="30" r="11" />
        </svg>
        <div className="splash-word">Medi<span style={{color:'#F08A5D'}}>Q</span>AI</div>
      </div>
      <div className="splash-tag">Hybrid Quantum‑Classical Health Screening</div>
      <svg className="splash-pulseline" viewBox="0 0 260 26"><path d="M0 13h60l10-11 14 22 12-16 8 5h156"/></svg>
    </div>
  );
}

function RiskGauge({score, riskLevel, size=180}){
  const r = 74, c = 2*Math.PI*r;
  const pct = Math.max(0,Math.min(100,score))/100;
  const color = RISK_COLOR[riskLevel];
  return (
    <div className="gauge-wrap" style={{width:size,height:size}}>
      <svg width={size} height={size} viewBox="0 0 180 180" style={{transform:'rotate(-90deg)'}}>
        <circle cx="90" cy="90" r={r} stroke="var(--surface-2)" strokeWidth="14" fill="none"/>
        <circle cx="90" cy="90" r={r} stroke={color} strokeWidth="14" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c*(1-pct)} style={{transition:'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)'}}/>
      </svg>
      <div className="gauge-center">
        <div className="gauge-score" style={{color}}>{score}</div>
        <div className="gauge-label">/ 100</div>
      </div>
    </div>
  );
}

function Bar({label, pct, color}){
  return (
    <div className="bar-row">
      <div style={{width:'38%', fontSize:'.86rem', color:'var(--ink-soft)'}}>{label}</div>
      <div className="bar-track"><div className="bar-fill" style={{width:pct+'%', background:color}}/></div>
      <div style={{width:'40px', textAlign:'right', fontSize:'.82rem', fontWeight:700, color}}>{pct}%</div>
    </div>
  );
}

// Rendered in <body> so a page's entrance animation can't trap it or put the top bar above it.
function Modal({onClose, children, width}){
  return createPortal(
    <div className="modal-overlay" onMouseDown={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal-box" style={width?{maxWidth:width}:{}}>{children}</div>
    </div>,
    document.body
  );
}

function LangSwitch({lang, setLang, t}){
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  },[]);
  const cur = LANGS.find(l=>l.code===lang);
  return (
    <div style={{position:'relative'}} ref={ref}>
      <button className="iconbtn" title={t('langLabel')} onClick={()=>setOpen(o=>!o)}><IconGlobe size={21}/></button>
      {open && (
        <div className="lang-menu pop-in">
          {LANGS.map(l=>(
            <button key={l.code} onClick={()=>{ setLang(l.code); setOpen(false); }}>
              <span>{l.native}</span>
              {l.code===lang && <IconCheck size={15} style={{color:'var(--primary)'}}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Pulse(){
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" style={{position:'relative',zIndex:1}}>
      <path d="M2 12h4l2.2 6 3.6-14 2.4 8H21" fill="none" stroke="var(--brand-pulse, var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Brand({onClick}){
  return (
    <div className="brand" onClick={onClick}>
      <div className="brand-mark"><div className="brand-pulse-bg"/><Pulse/></div>
      <div className="brand-name">Medi<span>Q</span>AI</div>
    </div>
  );
}

/* ============================== FOOTER ============================== */
function Footer({t, lang, onGoHome, onNav}){
  const year = new Date().getFullYear();
  const linkCols = [
    {title:t('footerProduct'), items:[
      {label:t('footerLinkHome'), page:'home'},
      {label:t('footerLinkHealthInfo'), page:'healthinfo'},
      {label:t('footerLinkTips'), page:'tips'},
      {label:t('footerLinkSymptoms'), page:'symptomsguide'},
    ]},
    {title:t('footerCompany'), items:[
      {label:t('footerLinkAbout')}, {label:t('footerLinkContact')},
    ]},
    {title:t('footerLegal'), items:[
      {label:t('footerLinkPrivacy')}, {label:t('footerLinkTerms')},
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="brand" onClick={onGoHome} style={{cursor:'pointer'}}>
            <div className="brand-mark"><div className="brand-pulse-bg"/><Pulse/></div>
            <div className="brand-name">Medi<span>Q</span>AI</div>
          </div>
          <p style={{color:'var(--ink-soft)',fontSize:'.88rem',lineHeight:1.6,maxWidth:280,margin:'14px 0 0'}}>{t('footerTagline')}</p>
        </div>
        <div className="site-footer-cols">
          {linkCols.map((col,i)=>(
            <div key={i} className="site-footer-col">
              <div className="site-footer-col-title">{col.title}</div>
              {col.items.map((it,j)=>(
                <div key={j} className="site-footer-link"
                  onClick={()=> it.page && onNav ? onNav(it.page) : undefined}
                  style={{cursor: it.page && onNav ? 'pointer':'default'}}>
                  {it.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>{t('footerRights').replace('2026', String(year))}</span>
      </div>
    </footer>
  );
}

/* ============================== AUTH PROMPT ============================== */
function AuthPrompt({t, onClose, onLogin, onSignup}){
  return (
    <Modal onClose={onClose} width={380}>
      <div style={{padding:'28px 26px 26px'}}>
        <h3 style={{margin:'0 0 8px',fontSize:'1.15rem'}}>{t('authPromptTitle')}</h3>
        <p style={{margin:'0 0 22px',color:'var(--ink-soft)',fontSize:'.92rem',lineHeight:1.55}}>{t('authPromptBody')}</p>
        <div style={{display:'flex',gap:10}}>
          <button className="pillbtn ghost" style={{flex:1}} onClick={onSignup}>{t('signup')}</button>
          <button className="pillbtn accent" style={{flex:1}} onClick={onLogin}>{t('login')}</button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================== BACK BUTTON (feature 3: present on every page) ============================== */
function BackButton({t, onClick}){
  return (
    <button className="backbtn" onClick={onClick}>
      <IconArrowL size={18}/> <span>{t('back')}</span>
    </button>
  );
}

/* ============================== TOPBAR SEARCH (feature 5: interactive middle) ============================== */
function TopSearch({t, lang, onSelect}){
  const [q,setQ] = useState('');
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  },[]);
  const query = q.trim().toLowerCase();
  const results = query ? DISEASES.filter(d=> d.name[lang].toLowerCase().includes(query)) : [];
  return (
    <div className="topbar-search" ref={ref}>
      <IconSearch size={20} className="topbar-search-glyph"/>
      <input
        value={q}
        onChange={e=>{ setQ(e.target.value); setOpen(true); }}
        onFocus={()=>setOpen(true)}
        placeholder={t('searchPlaceholder')}
      />
      {open && query && (
        <div className="topbar-search-results pop-in">
          {results.length===0 ? (
            <div className="topbar-search-empty">{t('noResults')}</div>
          ) : results.map(d=>(
            <button key={d.id} onClick={()=>{ onSelect(d.id); setQ(''); setOpen(false); }}>
              <span className="topbar-search-icon" style={{background:d.bg,color:d.color}}><d.Icon size={17}/></span>
              {d.name[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================== NOTIFICATIONS (dynamic) ============================== */
function NotificationBell({t, lang, user, records, onOpenHistory}){
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return ()=>document.removeEventListener('mousedown', onDoc);
  },[]);
  const reviewed = (user.role==='user' ? (records||[]).filter(r=>r.userId===user.id) : [])
    .filter(r=>r.doctorReview).sort((a,b)=>b.timestamp-a.timestamp).slice(0,4);
  return (
    <div style={{position:'relative'}} ref={ref}>
      <button className="iconbtn" title={t('notifTitle')} onClick={()=>setOpen(o=>!o)} style={{position:'relative'}}>
        <IconBell size={20}/>
        {reviewed.length>0 && <span className="notif-dot"/>}
      </button>
      {open && (
        <div className="lang-menu pop-in" style={{minWidth:260,padding:'6px 0'}}>
          <div style={{padding:'8px 14px 4px',fontSize:'.76rem',fontWeight:700,color:'var(--ink-faint)',textTransform:'uppercase',letterSpacing:'.04em'}}>{t('notifTitle')}</div>
          {reviewed.length===0 ? (
            <div style={{padding:'10px 14px 12px',fontSize:'.86rem',color:'var(--ink-faint)'}}>{t('notifEmpty')}</div>
          ) : reviewed.map(r=>{
            const d = DISEASES.find(x=>x.id===r.diseaseId);
            return (
              <button key={r.id} onClick={()=>{ setOpen(false); onOpenHistory && onOpenHistory(); }} style={{textAlign:'left',display:'flex',alignItems:'center',gap:10,justifyContent:'flex-start',fontWeight:500}}>
                <span className="topbar-search-icon" style={{background:d?d.bg:'var(--surface-2)',color:d?d.color:'var(--ink)'}}>{d && <d.Icon size={14}/>}</span>
                <span style={{fontSize:'.84rem',lineHeight:1.4}}>{t('notifYour')} {d?d.name[lang]:''} {t('notifScreeningReviewed')}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================== THEME TOGGLE (light / dark) ============================== */
function ThemeToggle({theme, onToggle, t}){
  const isDark = theme==='dark';
  const label = isDark ? t('themeToLight') : t('themeToDark');
  return (
    <button className="iconbtn theme-toggle" onClick={onToggle} title={label} aria-label={label} aria-pressed={isDark}>
      <span className={"theme-toggle-icons"+(isDark?" is-dark":"")}>
        <IconMoon size={20} className="tt-moon"/>
        <IconSun size={20} className="tt-sun"/>
      </span>
    </button>
  );
}

/* ============================== USER MENU (avatar in the topbar) ============================== */
function UserMenu({user, t, onOpenSettings, onLogout}){
  const [open,setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onKey(e){ if(e.key==='Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return ()=>{ document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  },[]);
  const RoleIcon = user.role==='doctor' ? IconDoctor : user.role==='admin' ? IconAdmin : IconUser;
  const roleLabel = user.role==='doctor' ? t('doctorRole') : user.role==='admin' ? t('roleAdmin') : t('patientRole');
  return (
    <div className="user-menu" ref={ref}>
      <button className={"user-btn"+(open?" open":"")} onClick={()=>setOpen(o=>!o)}
        aria-haspopup="menu" aria-expanded={open} aria-label={t('accountMenu')} title={user.name}>
        <span className="user-avatar"><RoleIcon size={19}/></span>
        <IconChevronDown size={15} className="user-caret"/>
      </button>
      {open && (
        <div className="user-dropdown pop-in" role="menu">
          <div className="user-dd-head">
            <span className="user-avatar lg"><RoleIcon size={23}/></span>
            <div style={{minWidth:0}}>
              <div className="user-dd-name">{user.name}</div>
              {user.email && <div className="user-dd-email">{user.email}</div>}
              <span className="user-dd-role">{roleLabel}</span>
            </div>
          </div>
          <button role="menuitem" onClick={()=>{ setOpen(false); onOpenSettings && onOpenSettings(); }}>
            <IconSettings size={17}/> {t('myAccount')}
          </button>
          <button role="menuitem" className="danger" onClick={()=>{ setOpen(false); onLogout && onLogout(); }}>
            <IconLogout size={17}/> {t('navLogout')}
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================== TOPBAR ============================== */
function TopBar({lang,setLang,t,user,onGoHome,onLogin,onSignup,onToggleSidebar,onQuickSearchSelect,records,onOpenHistory,theme,onToggleTheme,onOpenSettings,onLogout}){
  const barRef = useRef(null);
  const [scrolled,setScrolled] = useState(false);
  // Scroll behaviour: the bar tightens + gains depth after a few pixels, and a
  // thin progress line along its bottom edge tracks how far down the page you are.
  useEffect(()=>{
    let raf = 0;
    const update = ()=>{
      raf = 0;
      const y = window.scrollY || 0;
      setScrolled(y > 8);
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      if(barRef.current) barRef.current.style.setProperty('--sp', Math.min(1, Math.max(0, y/max)).toFixed(4));
    };
    const onScroll = ()=>{ if(!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if(raf) cancelAnimationFrame(raf); };
  },[]);

  return (
    <div className={"topbar"+(scrolled?" scrolled":"")} ref={barRef}>
      <div style={{display:'flex',alignItems:'center',gap:14,flex:'0 0 auto'}}>
        {user && (
          <button className="iconbtn mobile-menu-btn" onClick={onToggleSidebar}><IconMenu size={21}/></button>
        )}
        <Brand onClick={onGoHome}/>
      </div>

      <div className="topbar-middle">
        {user && user.role==='user' && (
          <TopSearch t={t} lang={lang} onSelect={onQuickSearchSelect}/>
        )}
      </div>

      <div className="topbar-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} t={t}/>
        <LangSwitch lang={lang} setLang={setLang} t={t}/>
        {!user && (
          <>
            <button className="pillbtn ghost" onClick={onLogin}>{t('login')}</button>
            <button className="pillbtn solid" onClick={onSignup}>{t('signup')}</button>
          </>
        )}
        {user && (
          <NotificationBell t={t} lang={lang} user={user} records={records} onOpenHistory={onOpenHistory}/>
        )}
        {user && (
          <UserMenu user={user} t={t} onOpenSettings={onOpenSettings} onLogout={onLogout}/>
        )}
      </div>
      <div className="topbar-progress" aria-hidden="true"/>
    </div>
  );
}

/* ============================== SIDEBAR ============================== */
function SideItem({icon:IconC, label, active, onClick, danger}){
  return (
    <div className={"side-item"+(active?" active":"")+(danger?" danger":"")} onClick={onClick}>
      <IconC size={18}/> <span>{label}</span>
    </div>
  );
}
function Sidebar({role, page, setPage, t, open, user, onOpenSettings, onLogout, onClose}){
  const userNavMain = [
    {key:'home', label:t('sideHome'), icon:IconHome},
    {key:'history', label:t('sideHistory'), icon:IconHistory},
  ];
  const userNavInfo = [
    {key:'tips', label:t('sideHealthyLiving'), icon:IconBook},
    {key:'symptomsguide', label:t('sideSymptoms'), icon:IconSymptoms},
    {key:'healthinfo', label:t('sideHealthInsights'), icon:IconMicroscope},
  ];
  /* Feature 1: Health Profile now sits in the middle of the Help & Support
     group, between Settings and Help & Support. */
  const userNavAccount = [
    {key:'settings', label:t('sideSettings'), icon:IconSettings},
    {key:'healthprofile', label:t('sideHealthProfile'), icon:IconHeart},
    {key:'help', label:t('sideHelpSupport'), icon:IconHelp},
  ];
  const doctorNav = [
    {key:'doctorqueue', label:t('navDoctorQueue'), icon:IconClipboard},
    {key:'doctorhistory', label:t('navDoctorHistory'), icon:IconHistory},
  ];
  const adminNav = [
    {key:'adminoverview', label:t('navAdminOverview'), icon:IconActivity},
    {key:'adminfeedback', label:t('navAdminFeedback'), icon:IconClipboard},
    {key:'adminusers', label:t('navAdminUsers'), icon:IconUsers},
  ];
  const RoleIcon = user? (user.role==='doctor'? IconDoctor: user.role==='admin'? IconAdmin: IconUser) : IconUser;
  function go(key){
    if(key==='settings' || key==='healthprofile') onOpenSettings(); else setPage(key);
  }
  return (
    <div className={"sidebar"+(open?" open":"")}>
      <div className="sidebar-drawer-head">
        <div className="brand">
          <div className="brand-mark"><div className="brand-pulse-bg"/><Pulse/></div>
          <div className="brand-name">Medi<span>Q</span>AI</div>
        </div>
        <button className="iconbtn" onClick={onClose} aria-label="Close menu"><IconX size={16}/></button>
      </div>
      <div className="sidebar-drawer-tagline">{t('sidebarTagline')}</div>

      <div className="sidebar-scroll scrollbar-thin">
        {role==='user' && (<>
          <div className="side-section-label">{t('sideGroupMain')}</div>
          {userNavMain.map(n=><SideItem key={n.key} icon={n.icon} label={n.label} active={page===n.key} onClick={()=>go(n.key)}/>)}
          <div className="side-section-label">{t('sideGroupHealthInfo')}</div>
          {userNavInfo.map(n=><SideItem key={n.key} icon={n.icon} label={n.label} active={page===n.key} onClick={()=>go(n.key)}/>)}
          <div className="side-section-label">{t('sideGroupAccount')}</div>
          {userNavAccount.map(n=><SideItem key={n.key} icon={n.icon} label={n.label} active={page===n.key} onClick={()=>go(n.key)}/>)}
        </>)}
        {role==='doctor' && doctorNav.map(n=><SideItem key={n.key} icon={n.icon} label={n.label} active={page===n.key} onClick={()=>setPage(n.key)}/>)}
        {role==='admin' && adminNav.map(n=><SideItem key={n.key} icon={n.icon} label={n.label} active={page===n.key} onClick={()=>setPage(n.key)}/>)}
      </div>

      <div className="sidebar-logout">
        <SideItem icon={IconLogout} label={role==='user'? t('sideLogout') : t('navLogout')} onClick={onLogout} danger/>
      </div>

      {/* Feature 4: account card fixed to the very bottom of the sidebar */}
      {user && (
        <div className="sidebar-account" onClick={onOpenSettings} title={t('myAccount')}>
          <div className="sidebar-account-avatar"><RoleIcon size={17}/></div>
          <div style={{minWidth:0}}>
            <div className="sidebar-account-name">{user.name}</div>
            <div className="sidebar-account-role">{user.role}</div>
          </div>
        </div>
      )}
    </div>
  );
}


export { SplashScreen, RiskGauge, Bar, Modal, LangSwitch, Pulse, Brand, TopBar, SideItem, Sidebar, Footer, AuthPrompt, BackButton };
