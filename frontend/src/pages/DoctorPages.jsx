import React, { useState } from 'react';
import { IconEye, IconThumbDown, IconThumbUp, IconX } from '../components/icons.jsx';
import { Modal } from '../components/common.jsx';
import { diseaseById } from '../data/diseases.js';
import { riskLabelKey } from '../engine/prediction.js';
import { CaseDetailBody } from './UserPages.jsx';
function DoctorQueuePage({records, lang, t, doctor, onSaveReview}){
  const [filter,setFilter] = useState('pending');
  const [openRec,setOpenRec] = useState(null);
  const list = records.filter(r=> filter==='all' ? true : filter==='pending' ? !r.doctorReview : !!r.doctorReview)
    .sort((a,b)=>b.timestamp-a.timestamp);
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('doctorHomeTitle')}</h2>
      <p className="section-sub">{t('doctorHomeSub')}</p>
      <div className="tabs" style={{marginBottom:20}}>
        {['pending','reviewed','all'].map(f=>(
          <button key={f} className={"tab"+(filter===f?" active":"")} onClick={()=>setFilter(f)}>{t(f)}</button>
        ))}
      </div>
      <div style={{overflowX:'auto'}}>
      <table className="table-simple">
        <thead><tr>
          <th>{t('patientCol')}</th><th>{t('conditionCol')}</th><th>{t('dateCol')}</th><th>{t('resultTitle')}</th><th>{t('verdictCol')}</th><th></th>
        </tr></thead>
        <tbody>
          {list.map(rec=>{
            const d = diseaseById(rec.diseaseId);
            const dateStr = new Date(rec.timestamp).toLocaleDateString(lang==='en'?'en-IN':lang==='te'?'te-IN':'hi-IN',{day:'numeric',month:'short'});
            return (
              <tr key={rec.id}>
                <td style={{fontWeight:600}}>{rec.userName}</td>
                <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><d.Icon size={16} style={{color:d.color}}/>{d.name[lang]}</span></td>
                <td>{dateStr}</td>
                <td><span className={"badge "+rec.result.riskLevel}>{t(riskLabelKey(rec.result.riskLevel))}</span></td>
                <td>{rec.doctorReview ? (
                    <span style={{color: rec.doctorReview.verdict==='agree'?'var(--sage)':'var(--danger)', display:'inline-flex',alignItems:'center',gap:6,fontWeight:700,fontSize:'.82rem'}}>
                      {rec.doctorReview.verdict==='agree'?<IconThumbUp size={14}/>:<IconThumbDown size={14}/>}
                      {rec.doctorReview.verdict==='agree'?t('agree'):t('disagree')}
                    </span>
                  ) : <span style={{color:'var(--amber)',fontWeight:700,fontSize:'.82rem'}}>{t('pending')}</span>}</td>
                <td><button className="pillbtn ghost" style={{padding:'8px 14px'}} onClick={()=>setOpenRec(rec)}><IconEye size={15}/></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {openRec && (
        <Modal onClose={()=>setOpenRec(null)} width={640}>
          <DoctorReviewForm rec={openRec} lang={lang} t={t} doctor={doctor}
            onClose={()=>setOpenRec(null)}
            onSave={(review)=>{ onSaveReview(openRec.id, review); setOpenRec(null); }}/>
        </Modal>
      )}
    </div>
  );
}

function DoctorReviewForm({rec, lang, t, doctor, onClose, onSave}){
  const [verdict,setVerdict] = useState(rec.doctorReview? rec.doctorReview.verdict : '');
  const [comment,setComment] = useState(rec.doctorReview? rec.doctorReview.comment: '');
  return (
    <div style={{padding:26}}>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:4}}>
        <button className="iconbtn" onClick={onClose}><IconX size={16}/></button>
      </div>
      <CaseDetailBody rec={rec} lang={lang} t={t}/>
      <div style={{marginTop:22,paddingTop:20,borderTop:'1px solid var(--line-soft)'}}>
        <label className="label">{t('yourVerdict')}</label>
        <div style={{display:'flex',gap:10,marginBottom:16}}>
          <button className="pillbtn" style={{flex:1,justifyContent:'center',borderColor: verdict==='agree'?'var(--sage)':'var(--line)', background: verdict==='agree'?'var(--sage-light)':'var(--surface)', color: verdict==='agree'?'var(--sage)':'var(--ink)'}} onClick={()=>setVerdict('agree')}><IconThumbUp size={15}/>{t('agree')}</button>
          <button className="pillbtn" style={{flex:1,justifyContent:'center',borderColor: verdict==='disagree'?'var(--danger)':'var(--line)', background: verdict==='disagree'?'var(--danger-light)':'var(--surface)', color: verdict==='disagree'?'var(--danger)':'var(--ink)'}} onClick={()=>setVerdict('disagree')}><IconThumbDown size={15}/>{t('disagree')}</button>
        </div>
        <label className="label">{t('comment')}</label>
        <textarea className="input" rows={3} value={comment} onChange={e=>setComment(e.target.value)} style={{resize:'vertical',marginBottom:16}}/>
        <button className="pillbtn solid" disabled={!verdict} style={{width:'100%',justifyContent:'center',padding:'12px'}}
          onClick={()=>onSave({doctorId:doctor.id, doctorName:doctor.name, verdict, comment, timestamp:Date.now()})}>
          {t('submitReview')}
        </button>
      </div>
    </div>
  );
}

function DoctorHistoryPage({records, lang, t, doctor}){
  const mine = records.filter(r=>r.doctorReview && r.doctorReview.doctorId===doctor.id).sort((a,b)=>b.doctorReview.timestamp-a.doctorReview.timestamp);
  const [openRec,setOpenRec] = useState(null);
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('doctorHistoryTitle')}</h2>
      {mine.length===0 ? <p className="section-sub">{t('noReviewsYet')}</p> : (
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {mine.map(rec=>{ const d = diseaseById(rec.diseaseId);
            return (
              <div key={rec.id} className="card" style={{display:'flex',alignItems:'center',gap:16,cursor:'pointer'}} onClick={()=>setOpenRec(rec)}>
                <div style={{width:44,height:44,borderRadius:12,background:d.bg,color:d.color,display:'flex',alignItems:'center',justifyContent:'center'}}><d.Icon size={20}/></div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{rec.userName} — {d.name[lang]}</div>
                  <div style={{fontSize:'.82rem',color:'var(--ink-faint)'}}>{rec.doctorReview.comment}</div>
                </div>
                <span style={{color: rec.doctorReview.verdict==='agree'?'var(--sage)':'var(--danger)',display:'flex',alignItems:'center',gap:6,fontWeight:700,fontSize:'.85rem'}}>
                  {rec.doctorReview.verdict==='agree'?<IconThumbUp size={16}/>:<IconThumbDown size={16}/>}{rec.doctorReview.verdict==='agree'?t('agree'):t('disagree')}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {openRec && <Modal onClose={()=>setOpenRec(null)} width={620}><div style={{padding:26}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:6}}><button className="iconbtn" onClick={()=>setOpenRec(null)}><IconX size={16}/></button></div>
        <CaseDetailBody rec={openRec} lang={lang} t={t}/>
      </div></Modal>}
    </div>
  );
}

/* ============================== ADMIN PAGES ============================== */

export { DoctorQueuePage, DoctorReviewForm, DoctorHistoryPage };
