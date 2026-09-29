import React, { useState } from 'react';
import { IconAdmin, IconDoctor, IconEye, IconThumbDown, IconThumbUp, IconUser, IconX } from '../components/icons.jsx';
import { Modal } from '../components/common.jsx';
import { DISEASES, diseaseById } from '../data/diseases.js';
import { CaseDetailBody } from './UserPages.jsx';
function AdminOverviewPage({records, lang, t}){
  const total = records.length;
  const reviewed = records.filter(r=>r.doctorReview).length;
  const agreed = records.filter(r=>r.doctorReview && r.doctorReview.verdict==='agree').length;
  const flagged = records.filter(r=>r.doctorReview && r.doctorReview.verdict==='disagree').length;
  const agreementPct = reviewed? Math.round((agreed/reviewed)*100) : 0;
  const byCondition = DISEASES.map(d=>{
    const recs = records.filter(r=>r.diseaseId===d.id && r.doctorReview);
    const ag = recs.filter(r=>r.doctorReview.verdict==='agree').length;
    return {d, total:recs.length, pct: recs.length? Math.round((ag/recs.length)*100): null};
  });
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('adminOverviewTitle')}</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,marginBottom:26}}>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--primary)'}}>{total}</div><div className="stat-lbl">{t('totalCases')}</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--ink)'}}>{reviewed}</div><div className="stat-lbl">{t('reviewedCases')}</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--sage)'}}>{agreementPct}%</div><div className="stat-lbl">{t('agreementRate')}</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'var(--danger)'}}>{flagged}</div><div className="stat-lbl">{t('flaggedCases')}</div></div>
      </div>
      <div className="card">
        <h3 style={{margin:'0 0 4px',fontSize:'1.02rem'}}>{t('byCondition')}</h3>
        <p style={{margin:'0 0 16px',fontSize:'.8rem',color:'var(--ink-faint)'}}>{t('overallAccuracyNote')}</p>
        {byCondition.map(({d,total,pct})=>(
          <div key={d.id} className="bar-row">
            <div style={{width:'34%',fontSize:'.86rem',display:'flex',alignItems:'center',gap:8,color:'var(--ink-soft)'}}><d.Icon size={15} style={{color:d.color}}/>{d.name[lang]}</div>
            <div className="bar-track"><div className="bar-fill" style={{width:(pct||0)+'%', background: pct===null?'var(--line)': pct>=70?'var(--sage)': pct>=40?'var(--amber)':'var(--danger)'}}/></div>
            <div style={{width:'50px',textAlign:'right',fontSize:'.82rem',fontWeight:700,color:'var(--ink-soft)'}}>{pct===null?'—':pct+'%'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminFeedbackPage({records, lang, t}){
  const [openRec,setOpenRec] = useState(null);
  const list = records.filter(r=>r.doctorReview).sort((a,b)=>b.doctorReview.timestamp-a.doctorReview.timestamp);
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('feedbackTitle')}</h2>
      {list.length===0? <p className="section-sub">{t('noReviewsYet')}</p> : (
        <div style={{overflowX:'auto'}}>
        <table className="table-simple">
          <thead><tr><th>{t('patientCol')}</th><th>{t('conditionCol')}</th><th>{t('doctorCol')}</th><th>{t('verdictCol')}</th><th>{t('dateCol')}</th><th></th></tr></thead>
          <tbody>
            {list.map(rec=>{ const d = diseaseById(rec.diseaseId);
              const dateStr = new Date(rec.doctorReview.timestamp).toLocaleDateString(lang==='en'?'en-IN':lang==='te'?'te-IN':'hi-IN',{day:'numeric',month:'short'});
              return (
                <tr key={rec.id}>
                  <td style={{fontWeight:600}}>{rec.userName}</td>
                  <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><d.Icon size={16} style={{color:d.color}}/>{d.name[lang]}</span></td>
                  <td>{rec.doctorReview.doctorName}</td>
                  <td><span style={{color: rec.doctorReview.verdict==='agree'?'var(--sage)':'var(--danger)',display:'inline-flex',alignItems:'center',gap:6,fontWeight:700,fontSize:'.82rem'}}>{rec.doctorReview.verdict==='agree'?<IconThumbUp size={14}/>:<IconThumbDown size={14}/>}{rec.doctorReview.verdict==='agree'?t('agree'):t('disagree')}</span></td>
                  <td>{dateStr}</td>
                  <td><button className="pillbtn ghost" style={{padding:'8px 14px'}} onClick={()=>setOpenRec(rec)}><IconEye size={15}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      )}
      {openRec && <Modal onClose={()=>setOpenRec(null)} width={620}><div style={{padding:26}}>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:6}}><button className="iconbtn" onClick={()=>setOpenRec(null)}><IconX size={16}/></button></div>
        <CaseDetailBody rec={openRec} lang={lang} t={t}/>
      </div></Modal>}
    </div>
  );
}

function AdminUsersPage({users, lang, t}){
  return (
    <div className="fade-in">
      <h2 className="section-title">{t('usersTitle')}</h2>
      <div style={{overflowX:'auto'}}>
      <table className="table-simple">
        <thead><tr><th>{t('fullName')}</th><th>{t('emailCol')}</th><th>{t('roleCol')}</th><th>{t('specialty')}</th></tr></thead>
        <tbody>
          {users.map(u=>{
            const RoleIcon = u.role==='doctor'?IconDoctor:u.role==='admin'?IconAdmin:IconUser;
            return (
              <tr key={u.id}>
                <td style={{fontWeight:600}}>{u.name}</td>
                <td>{u.email}</td>
                <td><span style={{display:'inline-flex',alignItems:'center',gap:7,textTransform:'capitalize'}}><RoleIcon size={15} style={{color:'var(--primary)'}}/>{u.role}</span></td>
                <td>{u.specialty || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}


export { AdminOverviewPage, AdminFeedbackPage, AdminUsersPage };
