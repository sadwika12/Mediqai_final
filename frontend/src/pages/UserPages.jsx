import React, { useEffect, useState } from 'react';
import {
  IconArrowR, IconCake, IconCheck, IconClipboard, IconInfo, IconLogout, IconMail, IconThumbDown, IconThumbUp, IconUser, IconX, IconHistory, IconHelp, IconSettings, IconChat, IconUpload, IconForm, IconTrash
} from '../components/icons.jsx';
import { Bar, RiskGauge, Modal } from '../components/common.jsx';
import { diseaseById } from '../data/diseases.js';
import { RISK_COLOR, riskLabelKey } from '../engine/prediction.js';
function CaseDetailBody({rec, lang, t}){
  const disease = diseaseById(rec.diseaseId);
  const result = rec.result;
  const dateStr = new Date(rec.timestamp).toLocaleString(lang==='en'?'en-IN':lang==='te'?'te-IN':'hi-IN', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
        <div style={{width:48,height:48,borderRadius:14,background:disease.bg,color:disease.color,display:'flex',alignItems:'center',justifyContent:'center'}}><disease.Icon size={22}/></div>
        <div>
          <div style={{fontWeight:700,fontSize:'1.08rem'}}>{disease.name[lang]}</div>
          <div style={{fontSize:'.8rem',color:'var(--ink-faint)'}}>{dateStr}</div>
        </div>
        <span className={"badge "+result.riskLevel} style={{marginLeft:'auto'}}>{t(riskLabelKey(result.riskLevel))}</span>
      </div>

      <div style={{display:'flex',gap:24,flexWrap:'wrap',marginBottom:18}}>
        <RiskGauge score={result.score} riskLevel={result.riskLevel} size={130}/>
        <div style={{flex:'1 1 200px'}}>
          <div style={{fontSize:'.78rem',textTransform:'uppercase',color:'var(--ink-faint)',marginBottom:8,fontWeight:700}}>{t('patientInputs')}</div>
          {rec.selectedIds.length===0? <div style={{color:'var(--ink-faint)',fontStyle:'italic',fontSize:'.88rem'}}>{t('none')}</div> :
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {rec.selectedIds.map(id=>{ const s=disease.symptoms.find(x=>x.id===id); if(!s) return null;
                return <div key={id} className="badge" style={{background:'var(--surface-2)',color:'var(--ink-soft)'}}>{s.label[lang]}</div>; })}
            </div>}
        </div>
      </div>

      <div style={{marginBottom:6,fontSize:'.78rem',textTransform:'uppercase',color:'var(--ink-faint)',fontWeight:700}}>{t('explainTitle')}</div>
      <div style={{marginBottom:14}}>
        {result.contributors.length===0? <div style={{color:'var(--ink-faint)',fontStyle:'italic',fontSize:'.88rem'}}>{t('none')}</div> :
          result.contributors.map(c=><Bar key={c.id} label={c.label[lang]} pct={c.pct} color={RISK_COLOR[result.riskLevel]}/>)}
      </div>

      {rec.doctorReview && (
        <div className="card" style={{background: rec.doctorReview.verdict==='agree'?'var(--sage-light)':'var(--danger-light)', border:'none'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontWeight:700,fontSize:'.9rem', color: rec.doctorReview.verdict==='agree'?'var(--sage)':'var(--danger)'}}>
            {rec.doctorReview.verdict==='agree'? <IconThumbUp size={16}/>:<IconThumbDown size={16}/>}
            {rec.doctorReview.doctorName} — {rec.doctorReview.verdict==='agree'? t('agree'): t('disagree')}
          </div>
          <div style={{fontSize:'.88rem',color:'var(--ink-soft)'}}>{rec.doctorReview.comment}</div>
        </div>
      )}
    </div>
  );
}

/* ============================== HISTORY PAGE ============================== */
function HistoryPage({records, lang, t, userId, onDelete}){
  const [openRec,setOpenRec] = useState(null);
  const [toDelete,setToDelete] = useState(null);     // record waiting for confirmation
  const [notice,setNotice] = useState(false);        // "Screening deleted" banner
  const mine = records.filter(r=>r.userId===userId).sort((a,b)=>b.timestamp-a.timestamp);
  const reviewedCount = mine.filter(r=>r.doctorReview).length;
  const methodIcon = {chatbot:IconChat, upload:IconUpload, form:IconForm};

  useEffect(()=>{
    if(!notice) return undefined;
    const timer = setTimeout(()=>setNotice(false), 3000);
    return ()=>clearTimeout(timer);
  },[notice]);

  function confirmDelete(){
    onDelete(toDelete.id);
    setToDelete(null);
    setNotice(true);
  }

  return (
    <div className="fade-in pg">
      <div className="pg-head">
        <span className="pg-head-icon"><IconHistory size={28}/></span>
        <h2 className="section-title">{t('historyTitle')}</h2>
        {mine.length>0 && (
          <div className="pg-chips">
            <span className="pg-chip"><b>{mine.length}</b> {t('statScreenings')}</span>
            <span className="pg-chip"><b>{reviewedCount}</b> {t('statReviewed')}</span>
          </div>
        )}
      </div>

      {notice && <div className="settings-saved-banner"><IconCheck size={16}/>{t('recordDeleted')}</div>}

      {mine.length===0 ? (
        <div className="card pg-empty">
          <span className="pg-empty-icon"><IconClipboard size={26}/></span>
          <p>{t('historyEmpty')}</p>
        </div>
      ) : (
        <div className="hist-list">
          {mine.map(rec=>{
            const d = diseaseById(rec.diseaseId);
            const MIcon = methodIcon[rec.inputMethod] || IconForm;
            const dateStr = new Date(rec.timestamp).toLocaleDateString(lang==='en'?'en-IN':lang==='te'?'te-IN':'hi-IN',{day:'numeric',month:'short',year:'numeric'});
            return (
              <div key={rec.id} className="card hist-row" style={{'--rc':RISK_COLOR[rec.result.riskLevel]}} onClick={()=>setOpenRec(rec)}>
                <div style={{width:46,height:46,borderRadius:13,background:d.bg,color:d.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><d.Icon size={21}/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700}}>{d.name[lang]}</div>
                  <div style={{fontSize:'.8rem',color:'var(--ink-faint)',display:'flex',alignItems:'center',gap:6,marginTop:2}}><MIcon size={13}/>{dateStr}</div>
                </div>
                <span className={"badge "+rec.result.riskLevel}>{t(riskLabelKey(rec.result.riskLevel))}</span>
                {rec.doctorReview && <span title="Doctor reviewed" style={{color: rec.doctorReview.verdict==='agree'?'var(--sage)':'var(--danger)'}}>{rec.doctorReview.verdict==='agree'?<IconThumbUp size={17}/>:<IconThumbDown size={17}/>}</span>}
                <button className="hist-del" title={t('deleteRecord')} aria-label={t('deleteRecord')}
                  onClick={(e)=>{ e.stopPropagation(); setToDelete(rec); }}>
                  <IconTrash size={17}/>
                </button>
                <IconArrowR size={17} style={{color:'var(--ink-faint)'}}/>
              </div>
            );
          })}
        </div>
      )}

      {openRec && (
        <Modal onClose={()=>setOpenRec(null)} width={620}>
          <div style={{padding:26}}>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:6}}>
              <button className="iconbtn" onClick={()=>setOpenRec(null)}><IconX size={16}/></button>
            </div>
            <CaseDetailBody rec={openRec} lang={lang} t={t}/>
            <div className="del-inline">
              <button className="btn-danger-soft" onClick={()=>{ setToDelete(openRec); setOpenRec(null); }}>
                <IconTrash size={15}/> {t('deleteRecord')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toDelete && (
        <Modal onClose={()=>setToDelete(null)} width={420}>
          <div className="del-dialog">
            <span className="del-icon"><IconTrash size={26}/></span>
            <h3>{t('deleteTitle')}</h3>
            <p>{t('deleteBody')}</p>
            <div className="del-actions">
              <button className="pillbtn ghost" onClick={()=>setToDelete(null)}>{t('cancel')}</button>
              <button className="btn-danger" onClick={confirmDelete}><IconTrash size={16}/> {t('deleteRecord')}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================== SETTINGS PAGE (feature 4) ============================== */
function SettingsPage({user, lang, t, onSave, saved, onLogout}){
  const [name,setName] = useState(user.name||'');
  const [gender,setGender] = useState(user.gender||'');
  const [age,setAge] = useState(user.age||'');
  function submit(e){
    e.preventDefault();
    onSave({ name: name.trim(), gender: gender||undefined, age: age? Number(age): undefined });
  }
  const roleLabel = user.role==='doctor' ? t('doctorRole') : user.role==='admin' ? t('roleAdmin') : t('patientRole');
  return (
    <div className="fade-in pg">
      <div className="pg-head">
        <span className="pg-head-icon"><IconSettings size={28}/></span>
        <h2 className="section-title">{t('settingsTitle')}</h2>
        <p className="section-sub">{t('settingsSub')}</p>
      </div>

      {saved && (
        <div className="settings-saved-banner"><IconCheck size={16}/>{t('changesSaved')}</div>
      )}

      <div className="card set-card">
        <div className="set-profile">
          <div className="set-avatar"><IconUser size={34}/></div>
          <div className="set-profile-name">{user.name}</div>
          <span className="set-profile-role">{roleLabel}</span>
        </div>

        <form onSubmit={submit} className="set-form">
          <div style={{marginBottom:16}}>
            <label className="label">{t('fullName')}</label>
            <input className="input" required value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="set-row">
            <div style={{flex:1,minWidth:0}}>
              <label className="label">{t('gender')}</label>
              <select className="input" value={gender} onChange={e=>setGender(e.target.value)}>
                <option value="">—</option>
                <option value="male">{t('genderMale')}</option>
                <option value="female">{t('genderFemale')}</option>
                <option value="other">{t('genderOther')}</option>
              </select>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <label className="label">{t('age')}</label>
              <div style={{position:'relative'}}>
                <input className="input" style={{paddingLeft:38}} type="number" min="1" max="120" value={age} onChange={e=>setAge(e.target.value)} placeholder={t('agePlaceholder')}/>
                <IconCake size={16} style={{position:'absolute',left:13,top:15,color:'var(--ink-faint)'}}/>
              </div>
            </div>
          </div>
          <div style={{marginBottom:22}}>
            <label className="label">{t('email')}</label>
            <div style={{position:'relative'}}>
              <input className="input" style={{paddingLeft:42,opacity:.7}} value={user.email} disabled/>
              <IconMail size={17} style={{position:'absolute',left:14,top:14,color:'var(--ink-faint)'}}/>
            </div>
            <div style={{fontSize:'.78rem',color:'var(--ink-faint)',marginTop:6}}>{t('accountEmailNote')}</div>
          </div>
          <button type="submit" className="pillbtn solid" style={{padding:'13px 24px',width:'100%',justifyContent:'center'}}>{t('saveChanges')}</button>
        </form>
      </div>

      <div style={{display:'flex',justifyContent:'center'}}>
        <button className="pillbtn ghost" style={{marginTop:20,color:'var(--danger)',borderColor:'var(--danger-light)'}} onClick={onLogout}>
          <IconLogout size={16}/> {t('navLogout')}
        </button>
      </div>
    </div>
  );
}

function HelpSupportPage({lang, t}){
  const faqs = [
    {q:t('helpFaq1q'), a:t('helpFaq1a')},
    {q:t('helpFaq2q'), a:t('helpFaq2a')},
    {q:t('helpFaq3q'), a:t('helpFaq3a')},
  ];
  return (
    <div className="fade-in pg">
      <div className="pg-head">
        <span className="pg-head-icon"><IconHelp size={28}/></span>
        <h2 className="section-title">{t('helpSupportTitle')}</h2>
        <p className="section-sub">{t('helpSupportSub')}</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:24}}>
        {faqs.map((f,i)=>(
          <div key={i} className="card faq-card">
            <div style={{fontWeight:700,marginBottom:8,display:'flex',gap:10,alignItems:'flex-start'}}>
              <IconInfo size={18} style={{color:'var(--primary)',flexShrink:0,marginTop:1}}/>{f.q}
            </div>
            <div style={{fontSize:'.9rem',color:'var(--ink-soft)',lineHeight:1.6,paddingLeft:28}}>{f.a}</div>
          </div>
        ))}
      </div>
      <div className="card help-contact">
        <span className="help-contact-icon"><IconMail size={22}/></span>
        <div style={{fontWeight:700,marginBottom:6,fontSize:'1.02rem'}}>{t('helpContactTitle')}</div>
        <div style={{fontSize:'.9rem',color:'var(--ink-soft)',marginBottom:10,lineHeight:1.55}}>{t('helpContactBody')}</div>
        <div style={{fontWeight:700,color:'var(--primary-dark)'}}>{t('helpContactEmail')}</div>
      </div>
    </div>
  );
}

/* ============================== DOCTOR PAGES ============================== */

export { CaseDetailBody, HistoryPage, SettingsPage, HelpSupportPage };
