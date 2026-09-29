import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  IconAlert, IconArrowR, IconChat, IconCheck, IconEdit, IconFile,
  IconForm, IconHistory, IconShield, IconUpload, IconHeart, IconDna, IconBrain, IconTips,
  IconPulse, IconHelp
} from '../components/icons.jsx';
import { RiskGauge, Bar } from '../components/common.jsx';
import { MotionGate, Reveal, CountUp, useInView, useScrollProgress, useHeroParallax } from '../components/motion.jsx';
import heroImg from '../assets/doctor-green.jpg';
import { DISEASES, ACTIONS, TIPS } from '../data/diseases.js';
import { RISK_COLOR, riskLabelKey, rankDiseases } from '../engine/prediction.js';
/* ---- Choose a condition ----
   A "Not sure?" banner sits on top for people who don't know their condition,
   followed by the six conditions in a grid that fills the page width. */
function DiseaseGrid({t, lang, onSelect, onUnsure, titleKey, subKey}){
  const cats = hp(lang,'cat');
  return (
    <div className="fade-in dg">
      <div className="dg-head">
        <h2 className="section-title">{t(titleKey||'chooseCondition')}</h2>
        <p className="section-sub">{t(subKey||'chooseConditionSub')}</p>
      </div>

      {onUnsure && (
        <Reveal variant="rise">
          <div className="dg-unsure">
            <span className="dg-unsure-icon"><IconHelp size={30}/></span>
            <div className="dg-unsure-text">
              <h3>{t('gridNotSure')}</h3>
              <p>{t('gridNotSureSub')}</p>
            </div>
            <div className="dg-unsure-actions">
              <button className="dg-btn-light" onClick={()=>onUnsure('chatbot')}><IconChat size={17}/> {t('gridChatBtn')}</button>
              <button className="dg-btn-ghost" onClick={()=>onUnsure('upload')}><IconUpload size={17}/> {t('gridUploadBtn')}</button>
            </div>
          </div>
        </Reveal>
      )}

      <div className="dg-divider"><span>{t('gridOrPick')}</span></div>

      <div className="dg-grid">
        {DISEASES.map((d,i)=>(
          <Reveal key={d.id} variant="rise" delay={i*80} className="rv-fill">
            <button className="dg-tile" style={{'--dc':d.color}} onClick={()=>onSelect(d.id)}>
              <span className="dg-tile-top">
                <span className="dg-tile-icon" style={{background:tint(d.color,16),color:ink(d.color)}}><d.Icon size={28}/></span>
                <span className="dg-tile-tag" style={{background:tint(d.color,14),color:ink(d.color)}}>{cats[d.id] || cats.diabetes}</span>
              </span>
              <span className="dg-tile-name">{d.name[lang]}</span>
              <span className="dg-tile-desc">{d.desc[lang]}</span>
              <span className="dg-tile-foot">
                <em>{d.symptoms.length} {t('gridSigns')}</em>
                <b>{t('gridStart')} <IconArrowR size={15}/></b>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StepTrack({t, step}){
  const steps=[t('step1'),t('step2'),t('step3'),t('step4')];
  return (
    <div style={{display:'flex',gap:8,marginBottom:26,flexWrap:'wrap'}}>
      {steps.map((s,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',borderRadius:100,
          background: i<=step? 'var(--primary-light)':'var(--surface-2)', color: i<=step?'var(--primary-dark)':'var(--ink-faint)',
          fontSize:'.8rem', fontWeight:700}}>
          {s}
        </div>
      ))}
    </div>
  );
}

/* ---- Chatbot panel ---- */
function ChatbotPanel({disease, lang, t, onChange, onDone}){
  const [msgs,setMsgs] = useState(()=>[{from:'bot', text: t('chatIntro')+' '+disease.name[lang]+'.'}]);
  const [idx,setIdx] = useState(0);
  const [typing,setTyping] = useState(false);
  const [selected,setSelected] = useState([]);
  const [done,setDone] = useState(false);
  const scrollRef = useRef(null);
  useEffect(()=>{ if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; },[msgs,typing]);
  useEffect(()=>{ // ask first question after intro
    const tm = setTimeout(()=>askNext(0), 500);
    return ()=>clearTimeout(tm);
    // eslint-disable-next-line
  },[]);
  function askNext(i){
    if(i>=disease.symptoms.length){
      setTyping(true);
      setTimeout(()=>{ setTyping(false); setMsgs(m=>[...m,{from:'bot', text:t('chatDone')}]); setDone(true); onDone(true); },600);
      return;
    }
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMsgs(m=>[...m,{from:'bot', text: t('chatAsk')+' '+disease.symptoms[i].label[lang]+'?'}]);
    }, 550);
  }
  function answer(yes){
    const s = disease.symptoms[idx];
    setMsgs(m=>[...m,{from:'user', text: yes? t('quickReplyYes'): t('quickReplyNo')}]);
    let next = selected;
    if(yes){ next = mergeIds(selected, s.ids); setSelected(next); onChange(next); }
    const ni = idx+1; setIdx(ni); askNext(ni);
  }
  return (
    <div className="chat-window">
      <div className="chat-scroll scrollbar-thin" ref={scrollRef}>
        {msgs.map((m,i)=>(<div key={i} className={"chat-bubble "+m.from+" fade-in"}>{m.text}</div>))}
        {typing && <div className="chat-bubble bot typing-dots"><span></span><span></span><span></span></div>}
      </div>
      {!done && !typing && idx<disease.symptoms.length && (
        <div className="chat-quick">
          <button onClick={()=>answer(true)}>{t('quickReplyYes')}</button>
          <button onClick={()=>answer(false)}>{t('quickReplyNo')}</button>
        </div>
      )}
    </div>
  );
}

/* ---- Form panel ---- */
function FormPanel({disease, lang, t, selected, setSelected}){
  function toggle(id){
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  }
  return (
    <div className="fade-in">
      <p className="section-sub" style={{marginBottom:16}}>{t('selectAllApply')}</p>
      {disease.symptoms.map(s=>(
        <div key={s.id} className={"checkrow"+(selected.includes(s.id)?" checked":"")} onClick={()=>toggle(s.id)}>
          <div className="checkbox-box">{selected.includes(s.id) && <IconCheck size={13} style={{color:'#fff'}}/>}</div>
          <span style={{fontWeight:600,fontSize:'.94rem'}}>{s.label[lang]}</span>
        </div>
      ))}
      <div className={"checkrow"+(selected.length===0?" checked":"")} onClick={()=>setSelected([])} style={{opacity:.85}}>
        <div className="checkbox-box">{selected.length===0 && <IconCheck size={13} style={{color:'#fff'}}/>}</div>
        <span style={{fontWeight:600,fontSize:'.94rem',fontStyle:'italic'}}>{t('none')}</span>
      </div>
    </div>
  );
}

/* ---- Upload panel ---- */
function UploadPanel({disease, lang, t, selected, setSelected}){
  const [file,setFile] = useState(null);
  const [stage,setStage] = useState('idle'); // idle, reading, done
  const [drag,setDrag] = useState(false);
  const inputRef = useRef(null);
  function handleFile(f){
    if(!f) return;
    setFile(f); setStage('reading');
    setTimeout(()=>{
      const picks = disease.symptoms.slice().sort((a,b)=>b.w-a.w).slice(0,2).map(s=>s.id);
      setSelected(picks);
      setStage('done');
    }, 1300);
  }
  return (
    <div className="fade-in">
      {stage==='idle' && (
        <div className={"dropzone"+(drag?" drag":"")}
          onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false); handleFile(e.dataTransfer.files[0]);}}
          onClick={()=>inputRef.current && inputRef.current.click()}>
          <input ref={inputRef} type="file" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png"/>
          <div style={{width:56,height:56,borderRadius:16,background:'var(--primary-light)',color:'var(--primary-dark)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}><IconUpload size={26}/></div>
          <div style={{fontWeight:700,marginBottom:6}}>{t('uploadPrompt')}</div>
          <div style={{fontSize:'.82rem',color:'var(--ink-faint)'}}>{t('uploadHint')}</div>
        </div>
      )}
      {stage==='reading' && (
        <div className="dropzone" style={{textAlign:'center'}}>
          <div className="typing-dots" style={{marginBottom:14}}><span></span><span></span><span></span></div>
          <div style={{fontWeight:700}}>{t('extracting')}</div>
          <div style={{fontSize:'.82rem',color:'var(--ink-faint)',marginTop:6}}><IconFile size={14} style={{verticalAlign:'-2px',marginRight:5}}/>{file && file.name}</div>
        </div>
      )}
      {stage==='done' && (
        <div className="fade-in">
          <div className="card" style={{background:'var(--sage-light)',border:'none',marginBottom:20,display:'flex',gap:10,alignItems:'flex-start'}}>
            <IconCheck size={18} style={{color:'var(--sage)',flexShrink:0,marginTop:2}}/>
            <div>
              <div style={{fontWeight:700,fontSize:'.9rem'}}>{t('uploadedAs')} {file && file.name}</div>
              <div style={{fontSize:'.82rem',color:'var(--ink-soft)',marginTop:2}}>{t('extractedTitle')}</div>
            </div>
          </div>
          <div style={{marginBottom:10, fontSize:'.85rem', fontWeight:700, color:'var(--ink-soft)'}}>{t('extractedTitle')}</div>
          {disease.symptoms.slice().sort((a,b)=>b.w-a.w).slice(0,2).map(s=>(
            <div key={s.id} className="checkrow checked">
              <div className="checkbox-box"><IconCheck size={13} style={{color:'#fff'}}/></div>
              <span style={{fontWeight:600,fontSize:'.94rem'}}>{s.label[lang]}</span>
            </div>
          ))}
          <div style={{marginTop:18,marginBottom:10,fontSize:'.85rem',fontWeight:700,color:'var(--ink-soft)'}}>{t('selectAllApply')}</div>
          {disease.symptoms.slice().sort((a,b)=>b.w-a.w).slice(2).map(s=>(
            <div key={s.id} className={"checkrow"+(selected.includes(s.id)?" checked":"")}
              onClick={()=>setSelected(prev=> prev.includes(s.id)? prev.filter(x=>x!==s.id): [...prev,s.id])}>
              <div className="checkbox-box">{selected.includes(s.id) && <IconCheck size={13} style={{color:'#fff'}}/>}</div>
              <span style={{fontWeight:600,fontSize:'.94rem'}}>{s.label[lang]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Disease detail flow (input step) ---- */
function DiseaseDetailInput({disease, lang, t, method, setMethod, selected, setSelected, chatDone, setChatDone, onProceed}){
  const canProceed = method==='chatbot' ? chatDone : true;
  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:22}}>
        <div style={{width:52,height:52,borderRadius:16,background:disease.bg,color:disease.color,display:'flex',alignItems:'center',justifyContent:'center'}}><disease.Icon size={26}/></div>
        <div>
          <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'1.4rem'}}>{disease.name[lang]}</h2>
          <div style={{color:'var(--ink-faint)',fontSize:'.86rem'}}>{disease.desc[lang]}</div>
        </div>
      </div>
      <div className="tabs" style={{marginBottom:24}}>
        <button className={"tab"+(method==='chatbot'?" active":"")} onClick={()=>setMethod('chatbot')}><IconChat size={15}/>{t('chatMethod')}</button>
        <button className={"tab"+(method==='form'?" active":"")} onClick={()=>setMethod('form')}><IconForm size={15}/>{t('formMethod')}</button>
        <button className={"tab"+(method==='upload'?" active":"")} onClick={()=>setMethod('upload')}><IconUpload size={15}/>{t('uploadMethod')}</button>
      </div>
      {method==='chatbot' && <ChatbotPanel key={disease.id+'-chat'} disease={disease} lang={lang} t={t} onChange={setSelected} onDone={setChatDone}/>}
      {method==='form' && <FormPanel disease={disease} lang={lang} t={t} selected={selected} setSelected={setSelected}/>}
      {method==='upload' && <UploadPanel disease={disease} lang={lang} t={t} selected={selected} setSelected={setSelected}/>}

      <div style={{marginTop:26,display:'flex',justifyContent:'flex-end'}}>
        <button className="pillbtn solid" disabled={!canProceed} style={{padding:'13px 26px'}} onClick={onProceed}>{t('proceed')} <IconArrowR size={16}/></button>
      </div>
    </div>
  );
}

/* ---- Review screen ---- */
function ReviewScreen({disease, lang, t, method, selected, onEdit, onPredict}){
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('reviewTitle')}</h2>
      <p className="section-sub">{t('reviewSub')}</p>
      <div className="card" style={{marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18,paddingBottom:18,borderBottom:'1px solid var(--line-soft)'}}>
          <div style={{width:44,height:44,borderRadius:12,background:disease.bg,color:disease.color,display:'flex',alignItems:'center',justifyContent:'center'}}><disease.Icon size={22}/></div>
          <div>
            <div style={{fontWeight:700}}>{disease.name[lang]}</div>
            <div style={{fontSize:'.8rem',color:'var(--ink-faint)',display:'flex',alignItems:'center',gap:6}}>
              {method==='chatbot' && <IconChat size={13}/>}{method==='form' && <IconForm size={13}/>}{method==='upload' && <IconUpload size={13}/>}
              {method==='chatbot'? t('chatMethod'): method==='form'? t('formMethod'): t('uploadMethod')}
            </div>
          </div>
        </div>
        {selected.length===0 ? (
          <div style={{color:'var(--ink-faint)',fontStyle:'italic',fontSize:'.9rem'}}>{t('none')}</div>
        ) : (
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {selected.map(id=>{
              const s = disease.symptoms.find(x=>x.id===id);
              if(!s) return null;
              return <div key={id} className="badge" style={{background:'var(--primary-light)',color:'var(--primary-dark)'}}><IconCheck size={13}/>{s.label[lang]}</div>;
            })}
          </div>
        )}
      </div>
      <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button className="pillbtn ghost" onClick={onEdit}><IconEdit size={15}/> {t('edit')}</button>
        <button className="pillbtn accent" style={{padding:'13px 26px'}} onClick={onPredict}>{t('predict')} <IconArrowR size={16}/></button>
      </div>
    </div>
  );
}

/* ---- Result screen ---- */
function ResultScreen({disease, lang, t, result, onNewCheck, onViewHistory}){
  const actions = ACTIONS[result.riskLevel][lang] || ACTIONS[result.riskLevel].en;
  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
        <IconCheck size={18} style={{color:'var(--sage)'}}/>
        <span style={{fontSize:'.85rem',color:'var(--sage)',fontWeight:700}}>{t('saveHistory')}</span>
      </div>
      <h2 className="section-title">{t('resultTitle')}</h2>

      <div className="card" style={{display:'flex',gap:34,flexWrap:'wrap',alignItems:'center',marginBottom:24}}>
        <RiskGauge score={result.score} riskLevel={result.riskLevel}/>
        <div style={{flex:'1 1 220px'}}>
          <span className={"badge "+result.riskLevel} style={{fontSize:'.85rem',padding:'7px 16px',marginBottom:14}}>
            {result.riskLevel==='low' && <IconCheck size={14}/>}
            {result.riskLevel!=='low' && <IconAlert size={14}/>}
            {t(riskLabelKey(result.riskLevel))}
          </span>
          <div style={{marginTop:14}}>
            <div style={{fontSize:'.78rem',textTransform:'uppercase',letterSpacing:'.05em',color:'var(--ink-faint)',marginBottom:4}}>{t('predictedCondition')}</div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:disease.bg,color:disease.color,display:'flex',alignItems:'center',justifyContent:'center'}}><disease.Icon size={18}/></div>
              <div style={{fontWeight:700,fontSize:'1.15rem',fontFamily:'var(--font-display)'}}>{disease.name[lang]}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginBottom:20}}>
        <h3 style={{margin:'0 0 16px',fontSize:'1.05rem'}}>{t('explainTitle')}</h3>
        {result.contributors.length===0 && <div style={{color:'var(--ink-faint)',fontSize:'.9rem'}}>{t('none')}</div>}
        {result.contributors.map(c=>(
          <Bar key={c.id} label={c.label[lang]} pct={c.pct} color={RISK_COLOR[result.riskLevel]}/>
        ))}
      </div>

      <div className="card" style={{marginBottom:24}}>
        <h3 style={{margin:'0 0 14px',fontSize:'1.05rem'}}>{t('actionsTitle')}</h3>
        {actions.map((a,i)=>(
          <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:12}}>
            <div style={{width:26,height:26,borderRadius:'50%',background:'var(--primary-light)',color:'var(--primary-dark)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}><IconCheck size={13}/></div>
            <div style={{fontSize:'.92rem',lineHeight:1.5}}>{a}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <button className="pillbtn solid" onClick={onNewCheck}>{t('newCheck')}</button>
        <button className="pillbtn ghost" onClick={onViewHistory}><IconHistory size={15}/>{t('viewHistory')}</button>
      </div>

      <div className="footer-disclaimer"><IconShield size={16} style={{flexShrink:0,marginTop:1}}/>{t('disclaimer')}</div>
    </div>
  );
}

function AnalyzingScreen({t}){
  return (
    <div className="fade-in" style={{textAlign:'center',padding:'80px 20px'}}>
      <div style={{width:70,height:70,margin:'0 auto 24px',position:'relative'}}>
        <svg viewBox="0 0 60 60" width="70" height="70" style={{animation:'spin 1.4s linear infinite'}}>
          <circle cx="30" cy="30" r="24" fill="none" stroke="var(--surface-2)" strokeWidth="6"/>
          <circle cx="30" cy="30" r="24" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray="70 200" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{fontWeight:700,fontFamily:'var(--font-display)',fontSize:'1.15rem'}}>{t('analyzing')}</div>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}

/* ============================== "NOT SURE WHAT I HAVE" FLOW ============================== */
/* For people who don't know their condition. Instead of picking a disease first,
   MediQAI asks about the two strongest warning signs of every condition, then
   asks a few follow-ups about the best match, and finally ranks all conditions. */

// Some signs (e.g. "Shortness of breath") appear under more than one condition.
// They are asked once, and a "yes" counts for every condition that lists them.
const symKey = (sym)=>sym.label.en;
const twinIds = (sym)=>DISEASES.flatMap(d=>d.symptoms.filter(x=>symKey(x)===symKey(sym)).map(x=>x.id));
const mergeIds = (prev, ids)=>Array.from(new Set([...prev, ...ids]));

function buildScreenPool(){
  const pool = [], seen = new Set();
  const ranked = DISEASES.map(d=>d.symptoms.slice().sort((a,b)=>b.w-a.w));
  for(let r=0; r<2; r++) ranked.forEach(syms=>{
    const sym = syms[r];
    if(sym && !seen.has(symKey(sym))){ seen.add(symKey(sym)); pool.push({...sym, ids:twinIds(sym)}); }
  });
  return pool;
}

function UnsureChatbot({lang, t, onChange, onDone}){
  const pool = useMemo(buildScreenPool, []);
  const [msgs,setMsgs] = useState(()=>[{from:'bot', text:t('unsureIntro')}]);
  const [queue,setQueue] = useState(pool);
  const [idx,setIdx] = useState(0);
  const [typing,setTyping] = useState(false);
  const [selected,setSelected] = useState([]);
  const [done,setDone] = useState(false);
  const scrollRef = useRef(null);
  useEffect(()=>{ if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; },[msgs,typing]);
  useEffect(()=>{
    const tm = setTimeout(()=>postQuestion(pool[0]), 700);
    return ()=>clearTimeout(tm);
    // eslint-disable-next-line
  },[]);
  function postQuestion(sym){
    setTyping(true);
    setTimeout(()=>{ setTyping(false); setMsgs(m=>[...m,{from:'bot', text:t('chatAsk')+' '+sym.label[lang]+'?'}]); }, 550);
  }
  function finish(text){
    setTyping(true);
    setTimeout(()=>{ setTyping(false); setMsgs(m=>[...m,{from:'bot', text}]); setDone(true); onDone(true); }, 600);
  }
  function advance(ni, sel, q, refining){
    if(ni < q.length){ postQuestion(q[ni]); return; }
    if(refining){ finish(t('unsureDone')); return; }
    // first round finished: dig deeper into the best match so far
    const ranked = rankDiseases(DISEASES, sel);
    if(ranked.length===0){ finish(t('unsureNone')); return; }
    const lead = ranked[0].disease;
    const asked = new Set(q.map(symKey));
    const rest = lead.symptoms.filter(x=>!asked.has(symKey(x))).sort((a,b)=>b.w-a.w).map(x=>({...x, ids:twinIds(x)}));
    if(rest.length===0){ finish(t('unsureDone')); return; }
    const nq = [...q, ...rest];
    setQueue(nq);
    setTyping(true);
    setTimeout(()=>{
      setMsgs(m=>[...m,{from:'bot', text:t('unsureFollow').replace('{d}', lead.name[lang])}]);
      postQuestion(nq[q.length]);
    }, 600);
  }
  function answer(yes){
    const s = queue[idx];
    setMsgs(m=>[...m,{from:'user', text: yes? t('quickReplyYes'): t('quickReplyNo')}]);
    let next = selected;
    if(yes){ next = [...selected, s.id]; setSelected(next); onChange(next); }
    const ni = idx+1; setIdx(ni);
    advance(ni, next, queue, queue.length>pool.length);
  }
  const pct = done ? 100 : Math.round(idx/queue.length*100);
  return (
    <div className="chat-window">
      <div className="uchat-progress"><i style={{width:pct+'%'}}/></div>
      <div className="chat-scroll scrollbar-thin" ref={scrollRef}>
        {msgs.map((m,i)=>(<div key={i} className={"chat-bubble "+m.from+" fade-in"}>{m.text}</div>))}
        {typing && <div className="chat-bubble bot typing-dots"><span></span><span></span><span></span></div>}
      </div>
      {!done && !typing && idx<queue.length && msgs.length>1 && (
        <div className="chat-quick">
          <button onClick={()=>answer(true)}>{t('quickReplyYes')}</button>
          <button onClick={()=>answer(false)}>{t('quickReplyNo')}</button>
        </div>
      )}
    </div>
  );
}

function UnsureUpload({lang, t, selected, setSelected}){
  const pool = useMemo(buildScreenPool, []);
  const [file,setFile] = useState(null);
  const [stage,setStage] = useState('idle');
  const [drag,setDrag] = useState(false);
  const [found,setFound] = useState([]);
  const inputRef = useRef(null);
  function handleFile(f){
    if(!f) return;
    setFile(f); setStage('reading');
    setTimeout(()=>{
      // Demo extraction: deterministic from the file, so the same file always gives the same findings.
      const h = Array.from(f.name).reduce((a,c)=>a+c.charCodeAt(0), 0) + (f.size||0);
      const first = DISEASES[h % DISEASES.length], second = DISEASES[(h+2) % DISEASES.length];
      const top = (d,n)=>d.symptoms.slice().sort((a,b)=>b.w-a.w).slice(0,n);
      const seenLabels = new Set();
      const picks = [...top(first,2), ...top(second,1)].filter(x=>!seenLabels.has(symKey(x)) && seenLabels.add(symKey(x)));
      setFound(picks); setSelected(mergeIds([], picks.flatMap(twinIds))); setStage('done');
    }, 1300);
  }
  const foundLabels = new Set(found.map(symKey));
  return (
    <div className="fade-in">
      {stage==='idle' && (
        <div className={"dropzone"+(drag?" drag":"")}
          onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false); handleFile(e.dataTransfer.files[0]);}}
          onClick={()=>inputRef.current && inputRef.current.click()}>
          <input ref={inputRef} type="file" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png"/>
          <div style={{width:56,height:56,borderRadius:16,background:'var(--primary-light)',color:'var(--primary-dark)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}><IconUpload size={26}/></div>
          <div style={{fontWeight:700,marginBottom:6}}>{t('uploadPrompt')}</div>
          <div style={{fontSize:'.82rem',color:'var(--ink-faint)'}}>{t('uploadHint')}</div>
        </div>
      )}
      {stage==='reading' && (
        <div className="dropzone" style={{textAlign:'center'}}>
          <div className="typing-dots" style={{marginBottom:14}}><span></span><span></span><span></span></div>
          <div style={{fontWeight:700}}>{t('extracting')}</div>
          <div style={{fontSize:'.82rem',color:'var(--ink-faint)',marginTop:6}}><IconFile size={14} style={{verticalAlign:'-2px',marginRight:5}}/>{file && file.name}</div>
        </div>
      )}
      {stage==='done' && (
        <div className="fade-in">
          <div className="card" style={{background:'var(--sage-light)',border:'none',marginBottom:20,display:'flex',gap:10,alignItems:'flex-start'}}>
            <IconCheck size={18} style={{color:'var(--sage)',flexShrink:0,marginTop:2}}/>
            <div>
              <div style={{fontWeight:700,fontSize:'.9rem'}}>{t('uploadedAs')} {file && file.name}</div>
              <div style={{fontSize:'.8rem',color:'var(--ink-soft)',marginTop:2}}>{t('unsureUploadNote')}</div>
            </div>
          </div>
          <div style={{marginBottom:10,fontSize:'.85rem',fontWeight:700,color:'var(--ink-soft)'}}>{t('unsureUploadFound')}</div>
          {found.map(sym=>{
            const d = DISEASES.find(x=>x.symptoms.some(y=>y.id===sym.id));
            return (
              <div key={sym.id} className="checkrow checked">
                <div className="checkbox-box"><IconCheck size={13} style={{color:'#fff'}}/></div>
                <span style={{fontWeight:600,fontSize:'.94rem',flex:1}}>{sym.label[lang]}</span>
                {d && <span className="badge" style={{background:tint(d.color,16),color:ink(d.color)}}>{d.name[lang]}</span>}
              </div>
            );
          })}
          <div style={{marginTop:18,marginBottom:10,fontSize:'.85rem',fontWeight:700,color:'var(--ink-soft)'}}>{t('unsureUploadMore')}</div>
          {pool.filter(x=>!foundLabels.has(symKey(x))).map(sym=>(
            <div key={sym.id} className={"checkrow"+(selected.includes(sym.id)?" checked":"")}
              onClick={()=>setSelected(prev=> prev.includes(sym.id)? prev.filter(x=>!sym.ids.includes(x)): mergeIds(prev, sym.ids))}>
              <div className="checkbox-box">{selected.includes(sym.id) && <IconCheck size={13} style={{color:'#fff'}}/>}</div>
              <span style={{fontWeight:600,fontSize:'.94rem'}}>{sym.label[lang]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UnsureInput({lang, t, method, setMethod, selected, setSelected, chatDone, setChatDone, onProceed}){
  const canProceed = method==='chatbot' ? chatDone : selected.length>0;
  return (
    <div className="fade-in u-wrap">
      <div className="u-head">
        <span className="pg-head-icon"><IconHelp size={28}/></span>
        <h2>{t('unsureFlowTitle')}</h2>
        <p>{t('unsureFlowSub')}</p>
      </div>
      <div className="tabs" style={{margin:'0 auto 24px'}}>
        <button className={"tab"+(method==='chatbot'?" active":"")} onClick={()=>setMethod('chatbot')}><IconChat size={15}/>{t('chatMethod')}</button>
        <button className={"tab"+(method==='upload'?" active":"")} onClick={()=>setMethod('upload')}><IconUpload size={15}/>{t('uploadMethod')}</button>
      </div>
      {method==='chatbot' && <UnsureChatbot key="u-chat" lang={lang} t={t} onChange={setSelected} onDone={setChatDone}/>}
      {method==='upload' && <UnsureUpload key="u-up" lang={lang} t={t} selected={selected} setSelected={setSelected}/>}
      <div style={{marginTop:26,display:'flex',justifyContent:'flex-end'}}>
        <button className="pillbtn solid" disabled={!canProceed} style={{padding:'13px 26px'}} onClick={onProceed}>{t('unsureSee')} <IconArrowR size={16}/></button>
      </div>
    </div>
  );
}

function UnsureResult({ranked, lang, t, onCheckDetail, onNewCheck, onViewHistory}){
  const top = ranked[0];
  const topD = top ? DISEASES.find(d=>d.id===top.diseaseId) : null;
  const others = ranked.slice(1,4);
  const actions = top ? (ACTIONS[top.result.riskLevel][lang] || ACTIONS[top.result.riskLevel].en) : [];
  return (
    <div className="fade-in u-wrap">
      {top && (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:6}}>
          <IconCheck size={18} style={{color:'var(--sage)'}}/>
          <span style={{fontSize:'.85rem',color:'var(--sage)',fontWeight:700}}>{t('saveHistory')}</span>
        </div>
      )}
      <div className="u-head">
        <h2>{t('uresultTitle')}</h2>
        <p>{t('uresultSub')}</p>
      </div>

      {!top && (
        <div className="card" style={{textAlign:'center',padding:'34px 26px',marginBottom:24}}>
          <div style={{width:60,height:60,borderRadius:20,background:'var(--sage-light)',color:'var(--sage)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><IconCheck size={28}/></div>
          <h3 style={{margin:'0 0 8px',fontSize:'1.15rem'}}>{t('uresultNoneTitle')}</h3>
          <p style={{margin:0,color:'var(--ink-soft)',lineHeight:1.6,fontSize:'.94rem'}}>{t('uresultNoneBody')}</p>
        </div>
      )}

      {top && (
        <div className="ur-top" style={{'--dc':topD.color}}>
          <RiskGauge score={top.result.score} riskLevel={top.result.riskLevel} size={150}/>
          <div className="ur-top-body">
            <span className="ur-best">{t('uresultBest')}</span>
            <div className="ur-name">
              <span className="ur-name-icon" style={{background:tint(topD.color,18),color:ink(topD.color)}}><topD.Icon size={22}/></span>
              <h3>{topD.name[lang]}</h3>
              <span className={"badge "+top.result.riskLevel}>{t(riskLabelKey(top.result.riskLevel))}</span>
            </div>
            <div className="ur-signs-label">{t('uresultSigns')}</div>
            <div className="ur-signs">
              {top.hitIds.map(id=>{
                const sym = topD.symptoms.find(x=>x.id===id);
                return sym ? <span key={id} className="badge" style={{background:'var(--primary-light)',color:'var(--primary-dark)'}}><IconCheck size={12}/>{sym.label[lang]}</span> : null;
              })}
            </div>
            <button className="pillbtn solid" style={{marginTop:6}} onClick={()=>onCheckDetail(topD.id, top.hitIds)}>
              {t('uresultDetail').replace('{d}', topD.name[lang])} <IconArrowR size={15}/>
            </button>
          </div>
        </div>
      )}

      {others.length>0 && (
        <div className="card ur-also">
          <h3>{t('uresultAlso')}</h3>
          {others.map(o=>{
            const d = DISEASES.find(x=>x.id===o.diseaseId);
            return (
              <div key={o.diseaseId} className="ur-row">
                <span className="ur-row-icon" style={{background:tint(d.color,16),color:ink(d.color)}}><d.Icon size={20}/></span>
                <div className="ur-row-main">
                  <b>{d.name[lang]}</b>
                  <div className="ur-bar"><i style={{width:o.result.score+'%',background:RISK_COLOR[o.result.riskLevel]}}/></div>
                </div>
                <span className={"badge "+o.result.riskLevel}>{t(riskLabelKey(o.result.riskLevel))}</span>
                <button className="ur-check" onClick={()=>onCheckDetail(d.id, o.hitIds)}>{t('uresultCheck')} <IconArrowR size={14}/></button>
              </div>
            );
          })}
        </div>
      )}

      {top && (
        <div className="card" style={{marginBottom:24}}>
          <h3 style={{margin:'0 0 14px',fontSize:'1.05rem'}}>{t('actionsTitle')}</h3>
          {actions.map((a,i)=>(
            <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:12}}>
              <div style={{width:26,height:26,borderRadius:'50%',background:'var(--primary-light)',color:'var(--primary-dark)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}><IconCheck size={13}/></div>
              <div style={{fontSize:'.92rem',lineHeight:1.5}}>{a}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <button className="pillbtn solid" onClick={onNewCheck}>{t('newCheck')}</button>
        <button className="pillbtn ghost" onClick={onViewHistory}><IconHistory size={15}/>{t('viewHistory')}</button>
      </div>
      <div className="footer-disclaimer"><IconShield size={16} style={{flexShrink:0,marginTop:1}}/>{t('disclaimer')}</div>
    </div>
  );
}

/* ============================== HOME (WELCOME) ============================== */

const HP = {
  en:{
    takes:"Takes about 3 minutes", t1:"Private & secure", t2:"Evidence-based models", t3:"Doctor reviewed",
    vitals:"Vitals status", vitalsVal:"Looking normal", assistant:"MediQAI assistant", online:"Online 24/7",
    howEyebrow:"Simple & secure process",
    howSub:"Three easy steps to clear, clinical-grade health insights",
    updated:"Updated today", startNow:"Start screening now", askNow:"Ask the assistant", uploadNow:"Upload a document",
    viewHistory:"View history", latest:"Latest screenings", reviewedTag:"Reviewed", awaiting:"Awaiting review",
    live:"Live", noActivity:"No screenings yet", noActivityDesc:"Complete your first health check and it will show up here.",
    cat:{diabetes:"Metabolic", heart:"Cardiovascular", cancer:"Oncology", neuro:"Neurology", kidney:"Renal", respiratory:"Respiratory"}
  },
  te:{
    takes:"సుమారు 3 నిమిషాలు", t1:"గోప్యం & సురక్షితం", t2:"ఆధారాల ఆధారిత నమూనాలు", t3:"వైద్యుల సమీక్ష",
    vitals:"ఆరోగ్య స్థితి", vitalsVal:"సాధారణంగా ఉంది", assistant:"MediQAI సహాయకుడు", online:"24/7 అందుబాటులో",
    howEyebrow:"సులభమైన & సురక్షిత ప్రక్రియ",
    howSub:"స్పష్టమైన ఆరోగ్య సమాచారానికి మూడు సులభమైన దశలు",
    updated:"ఈ రోజు నవీకరించబడింది", startNow:"స్క్రీనింగ్ ప్రారంభించండి", askNow:"సహాయకుడిని అడగండి", uploadNow:"పత్రాన్ని అప్‌లోడ్ చేయండి",
    viewHistory:"చరిత్ర చూడండి", latest:"తాజా స్క్రీనింగ్‌లు", reviewedTag:"సమీక్షించబడింది", awaiting:"సమీక్ష కోసం వేచి ఉంది",
    live:"లైవ్", noActivity:"ఇంకా స్క్రీనింగ్‌లు లేవు", noActivityDesc:"మీ మొదటి ఆరోగ్య పరీక్షను పూర్తి చేయండి, అది ఇక్కడ కనిపిస్తుంది.",
    cat:{diabetes:"జీవక్రియ", heart:"హృదయ", cancer:"ఆంకాలజీ", neuro:"నాడీ", kidney:"మూత్రపిండాలు", respiratory:"శ్వాస"}
  },
  hi:{
    takes:"लगभग 3 मिनट लगते हैं", t1:"निजी और सुरक्षित", t2:"साक्ष्य-आधारित मॉडल", t3:"डॉक्टर द्वारा समीक्षित",
    vitals:"स्वास्थ्य स्थिति", vitalsVal:"सामान्य दिख रहा है", assistant:"MediQAI सहायक", online:"24/7 उपलब्ध",
    howEyebrow:"सरल और सुरक्षित प्रक्रिया",
    howSub:"स्पष्ट, क्लिनिकल-ग्रेड जानकारी के लिए तीन आसान चरण",
    updated:"आज अपडेट किया गया", startNow:"स्क्रीनिंग शुरू करें", askNow:"सहायक से पूछें", uploadNow:"दस्तावेज़ अपलोड करें",
    viewHistory:"इतिहास देखें", latest:"हाल की स्क्रीनिंग", reviewedTag:"समीक्षित", awaiting:"समीक्षा की प्रतीक्षा",
    live:"लाइव", noActivity:"अभी तक कोई स्क्रीनिंग नहीं", noActivityDesc:"अपनी पहली स्वास्थ्य जांच पूरी करें, वह यहां दिखाई देगी।",
    cat:{diabetes:"चयापचय", heart:"हृदय", cancer:"ऑन्कोलॉजी", neuro:"तंत्रिका", kidney:"गुर्दा", respiratory:"श्वसन"}
  }
};
const hp = (lang, key) => (HP[lang] || HP.en)[key] ?? HP.en[key];

/* Theme-aware tints: they follow light / dark automatically instead of using fixed pastel hex values. */
const tint = (c, pct=16) => `color-mix(in srgb, ${c} ${pct}%, var(--surface))`;
const ink  = (c) => `color-mix(in srgb, ${c} 70%, var(--ink))`;

function timeAgo(ts, lang){
  const loc = lang==='en' ? 'en-IN' : lang==='te' ? 'te-IN' : 'hi-IN';
  try{
    const rtf = new Intl.RelativeTimeFormat(loc, {numeric:'auto'});
    const s = Math.round((ts - Date.now())/1000), a = Math.abs(s);
    if(a < 60) return rtf.format(0,'second');
    if(a < 3600) return rtf.format(Math.round(s/60),'minute');
    if(a < 86400) return rtf.format(Math.round(s/3600),'hour');
    if(a < 86400*30) return rtf.format(Math.round(s/86400),'day');
    return rtf.format(Math.round(s/(86400*30)),'month');
  }catch(e){
    return new Date(ts).toLocaleDateString(loc,{day:'numeric',month:'short'});
  }
}

/* Banner artwork: the doctor illustration (recoloured to the site's green),
   fading out of the deep-green banner, with two glass status chips on top. */
function HeroStage({lang}){
  return (
    <div className="hp-stage">
      <img className="hp-stage-img" src={heroImg} alt="" decoding="async"/>
      <div className="hp-float hp-float-a">
        <span className="hp-float-icon" style={{background:'var(--sage-light)',color:'var(--sage)'}}><IconPulse size={19}/></span>
        <span>
          <em>{hp(lang,'vitals')}</em>
          <b>{hp(lang,'vitalsVal')}</b>
        </span>
      </div>
      <div className="hp-float hp-float-b">
        <span className="hp-float-icon" style={{background:'var(--primary-light)',color:'var(--primary)'}}><IconChat size={19}/></span>
        <span>
          <em>{hp(lang,'assistant')}</em>
          <b style={{color:'var(--sage)'}}>{hp(lang,'online')}</b>
        </span>
      </div>
    </div>
  );
}

/* Three steps joined by a line that fills as the section scrolls through the screen. */
function HowItWorks({lang, t, steps}){
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  const n = steps.length;
  return (
    <Reveal variant="zoom">
      <section className="hp-how" ref={ref}>
        <div className="hp-how-head">
          <span className="hp-how-eyebrow">{hp(lang,'howEyebrow')}</span>
          <h3>{t('homeHowTitle')}</h3>
          <p>{hp(lang,'howSub')}</p>
        </div>
        <div className="hp-how-grid">
          {steps.map((st,i)=>{
            const seg = Math.max(0, Math.min(1, p*(n-1) - i));
            const on = i===0 ? p>0.02 : p*(n-1) >= i-0.02;
            return (
              <Reveal key={i} variant="rise" delay={i*130} className="rv-fill">
                <div className={"hp-how-card"+(on?" on":"")}>
                  <span className="hp-how-num">{i+1}</span>
                  {i<n-1 && <span className="hp-how-seg"><i style={{'--seg':seg}}/></span>}
                  <h4>{st.t}</h4>
                  <p>{st.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

/* Recent activity: live counters, a review-progress ring, a mini activity chart
   and a timeline of the latest screenings. */
function RecentActivity({t, lang, mine, reviewed, onOpenHistory, onStart}){
  const [ref, seen] = useInView();
  const sorted = [...mine].sort((a,b)=>b.timestamp-a.timestamp);
  const latest = sorted.slice(0,4);
  const pct = mine.length ? Math.round(reviewed.length/mine.length*100) : 0;
  const bars = sorted.slice(0,7).reverse();
  const C = 2*Math.PI*24;
  return (
    <div ref={ref} className={"hp-activity rv rv-rise"+(seen?" in seen":"")}>
      <div className="hp-activity-head">
        <div className="hp-activity-title">
          <span className="hp-live" title={hp(lang,'live')}><i/></span>
          <h3>{t('recentActivityTitle')}</h3>
        </div>
        <span className="hp-activity-updated">{hp(lang,'updated')}</span>
      </div>

      <div className="hp-stat-row">
        <div className="hp-stat">
          <span className="hp-stat-badge" style={{background:tint('var(--primary)',18),color:ink('var(--primary)')}}><IconShield size={22}/></span>
          <span className="hp-stat-text">
            <b><CountUp to={mine.length} start={seen}/></b>
            <em>{t('statScreenings')}</em>
          </span>
          {bars.length>0 && (
            <span className="hp-spark" aria-hidden="true">
              {bars.map((r,i)=>(
                <i key={r.id} style={{'--k':i, '--rc':RISK_COLOR[r.result.riskLevel], height:Math.max(16, r.result.score)+'%'}}/>
              ))}
            </span>
          )}
        </div>

        <div className="hp-stat">
          <span className="hp-ring" aria-hidden="true">
            <svg viewBox="0 0 56 56" width="56" height="56">
              <circle cx="28" cy="28" r="24" className="hp-ring-track"/>
              <circle cx="28" cy="28" r="24" className="hp-ring-fill" strokeDasharray={C}
                style={{strokeDashoffset: seen ? C*(1-pct/100) : C}}/>
            </svg>
            <span className="hp-ring-num"><CountUp to={pct} start={seen} suffix="%"/></span>
          </span>
          <span className="hp-stat-text">
            <b><CountUp to={reviewed.length} start={seen}/><small>/{mine.length}</small></b>
            <em>{t('statReviewed')}</em>
          </span>
        </div>
      </div>

      {latest.length===0 ? (
        <div className="hp-empty">
          <svg viewBox="0 0 200 40" className="hp-empty-line" aria-hidden="true"><path d="M0 22h58l10-16 14 32 12-24 8 8h98"/></svg>
          <b>{hp(lang,'noActivity')}</b>
          <p>{hp(lang,'noActivityDesc')}</p>
          <button className="hp-btn-soft" onClick={onStart}>{t('exploreDiseases')} <IconArrowR size={15}/></button>
        </div>
      ) : (
        <div>
          <div className="hp-tl-head">
            <span>{hp(lang,'latest')}</span>
            <span className="hp-viewall" onClick={onOpenHistory}>{hp(lang,'viewHistory')} <IconArrowR size={14}/></span>
          </div>
          <div className="hp-tl">
            {latest.map((r,i)=>{
              const d = DISEASES.find(x=>x.id===r.diseaseId);
              if(!d) return null;
              const risk = r.result.riskLevel;
              const done = !!r.doctorReview;
              return (
                <button key={r.id} className="hp-tl-row" style={{'--k':i, '--rc':RISK_COLOR[risk]}} onClick={onOpenHistory}>
                  <span className="hp-tl-icon" style={{background:tint(d.color,16), color:ink(d.color)}}><d.Icon size={18}/></span>
                  <span className="hp-tl-main">
                    <b>{d.name[lang]}</b>
                    <em>{timeAgo(r.timestamp, lang)}</em>
                  </span>
                  <span className="hp-tl-pills">
                    <span className={"badge "+risk}>{t(riskLabelKey(risk))}</span>
                    <span className={"hp-tl-status "+(done?"done":"wait")}>
                      {done ? <IconCheck size={13}/> : <i className="hp-wait-dot"/>}
                      {done ? hp(lang,'reviewedTag') : hp(lang,'awaiting')}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function WelcomeScreen({t, lang, user, records, onExplore, onQuickSelect, onQuickAction, onGoTips, ready=true}){
  const heroRef = useRef(null);
  useHeroParallax(heroRef);
  const firstName = (user.name||'').trim().split(' ')[0] || user.name;
  const mine = records ? records.filter(r=>r.userId===user.id) : [];
  const reviewed = mine.filter(r=>r.doctorReview);
  const quickActions = [
    {key:'form',    Icon:IconPulse,  c:'#0E7C86', title:t('qaCheckTitle'),  desc:t('qaCheckDesc'),  cta:hp(lang,'startNow')},
    {key:'chatbot', Icon:IconChat,   c:'#3D6FB4', title:t('qaChatTitle'),   desc:t('qaChatDesc'),   cta:hp(lang,'askNow')},
    {key:'upload',  Icon:IconUpload, c:'#C98A2C', title:t('qaUploadTitle'), desc:t('qaUploadDesc'), cta:hp(lang,'uploadNow')},
  ];
  const trust = [hp(lang,'t1'), hp(lang,'t2'), hp(lang,'t3')];
  const howSteps = [
    {t:t('homeHow1t'), d:t('homeHow1d')},
    {t:t('homeHow2t'), d:t('homeHow2d')},
    {t:t('homeHow3t'), d:t('homeHow3d')},
  ];
  const cats = hp(lang,'cat');
  const dayTip = TIPS[new Date().getDate() % TIPS.length];

  return (
    <MotionGate paused={!ready}>
    <div className="fade-in hp">

      {/* ---------- HERO BANNER ---------- */}
      <section className={"hp-hero"+(ready?" hp-go":"")} ref={heroRef}>
        <span className="hp-blob hp-blob-1"/>
        <span className="hp-blob hp-blob-2"/>
        <div className="hp-hero-inner">
          <div className="hp-hero-text">
            <span className="hp-pill hp-in" style={{'--i':0}}>{t('welcomeGreeting')}, {firstName}</span>
            <h1 className="hp-title hp-in" style={{'--i':1}}>{t('welcomeHeadline')}</h1>
            <p className="hp-sub hp-in" style={{'--i':2}}>{t('welcomeHeadlineSub')}</p>
            <div className="hp-cta-row hp-in" style={{'--i':3}}>
              <button className="hp-btn-primary" onClick={onExplore}>
                <IconShield size={18}/>
                <span>{t('exploreDiseases')}</span>
                <IconArrowR size={18} className="hp-btn-arrow"/>
              </button>
              <span className="hp-chip"><IconHistory size={15}/> {hp(lang,'takes')}</span>
            </div>
            <div className="hp-trust hp-in" style={{'--i':4}}>
              {trust.map((x,i)=>(
                <span key={i} className="hp-trust-item"><IconCheck size={15}/> {x}</span>
              ))}
            </div>
          </div>
          <HeroStage lang={lang}/>
        </div>
      </section>

      {/* ---------- QUICK ACTIONS ---------- */}
      <Reveal className="hp-head">
        <div>
          <h3>{t('quickActionsTitle')}</h3>
          <p>{t('quickActionsSub')}</p>
        </div>
      </Reveal>
      <div className="hp-qa-grid">
        {quickActions.map((qa,i)=>(
          <Reveal key={qa.key} variant="rise" delay={i*120} className="rv-fill">
            <div className="hp-qa-card" style={{'--qa':qa.c}} onClick={()=>onQuickAction && onQuickAction(qa.key)}>
              <div className="hp-qa-icon"><qa.Icon size={26}/></div>
              <div className="hp-qa-title">{qa.title}</div>
              <div className="hp-qa-desc">{qa.desc}</div>
              <div className="hp-qa-cta">{qa.cta} <IconArrowR size={15}/></div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---------- SCREENING AREAS ---------- */}
      <Reveal className="hp-head">
        <div>
          <h3>{t('screeningAreasTitle')}</h3>
          <p>{t('screeningAreasSub')}</p>
        </div>
        <span className="hp-viewall" onClick={onExplore}>{t('viewAll')} <IconArrowR size={14}/></span>
      </Reveal>
      <div className="hp-disease-grid">
        {DISEASES.slice(0,4).map((d,i)=>(
          <Reveal key={d.id} variant={i%2===0 ? 'flip' : 'zoom'} delay={i*110} className="rv-fill">
            <div className="hp-disease-card">
              <div className="hp-disease-top">
                <span className="hp-disease-icon" style={{background:tint(d.color,16),color:ink(d.color)}}><d.Icon size={22}/></span>
                <span className="hp-disease-tag" style={{background:tint(d.color,16),color:ink(d.color)}}>{cats[d.id] || cats.diabetes}</span>
              </div>
              <div>
                <h4 className="hp-disease-name">{d.name[lang]}</h4>
                <p className="hp-disease-desc">{d.desc[lang]}</p>
              </div>
              <button className="hp-disease-btn" onClick={()=>onQuickSelect(d.id)}>
                {t('learnMore')} <IconArrowR size={14}/>
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---------- HOW IT WORKS ---------- */}
      <HowItWorks lang={lang} t={t} steps={howSteps}/>

      {/* ---------- ACTIVITY + TIP ---------- */}
      <div className="hp-bottom">
        <RecentActivity t={t} lang={lang} mine={mine} reviewed={reviewed}
          onOpenHistory={()=>onQuickAction && onQuickAction('history')} onStart={onExplore}/>

        <Reveal variant="right" delay={160} className="rv-fill">
          <div className="hp-tip">
            <span className="hp-tip-bulb"><IconTips size={26}/></span>
            <div className="hp-tip-label">{t('todaysTipTitle')}</div>
            <p className="hp-tip-text">{dayTip[lang]}</p>
            {onGoTips && <button className="hp-tip-link" onClick={onGoTips}>{t('tipLearnMore')} <IconArrowR size={13}/></button>}
          </div>
        </Reveal>
      </div>

    </div>
    </MotionGate>
  );
}

/* ============================== CASE DETAIL (shared: history / doctor) ============================== */

export { DiseaseGrid, StepTrack, ChatbotPanel, FormPanel, UploadPanel, DiseaseDetailInput, ReviewScreen, ResultScreen, AnalyzingScreen, WelcomeScreen, UnsureInput, UnsureResult };