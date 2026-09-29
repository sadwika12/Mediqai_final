import React, { useState } from 'react';
import {
  IconLock, IconMail, IconUser, IconDoctor, IconAdmin, IconCake, IconCheck
} from '../components/icons.jsx';
import { uid } from '../utils/storage.js';
import { Brand, BackButton } from '../components/common.jsx';

/* ============================== AUTH PAGES ============================== */
/* AuthVisual mirrors itself (gradient angle + decorative line) depending on which
   side it sits on, so login and signup genuinely look like opposite layouts. */
function AuthVisual({t, side}){
  const mirrored = side==='right';
  return (
    <div className="auth-visual" style={{
      background: mirrored
        ? 'linear-gradient(200deg,#0B2226 0%,#123B41 60%,#0E5A5F 100%)'
        : 'linear-gradient(160deg,#0B2226 0%,#123B41 60%,#0E5A5F 100%)'
    }}>
      <svg style={{position:'absolute',bottom:0,left:0,width:'100%',opacity:.5,transform: mirrored? 'scaleX(-1)':'none'}} viewBox="0 0 500 120"><path d="M0 70h90l16-44 26 88 20-66 16 22h332" fill="none" stroke="#7FE0D6" strokeWidth="2.5"/></svg>
      <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'0 50px'}}>
        <h1>MediQAI</h1>
        <h2 className="display" style={{fontSize:'1.9rem',margin:'0 0 14px',color:'#fff'}}>{t('tagline')}</h2>
        <p style={{color:'#AEDAD5',fontSize:'.95rem',lineHeight:1.6,maxWidth:340,margin:'0 auto'}}>{t('heroSub')}</p>
      </div>
    </div>
  );
}

/* Shared shell: places the visual panel on the opposite side from before and
   plays a short flip transition whenever `mode` changes (login <-> signup). */
function AuthShell({t, mode, formWidth, children}){
  const visualOnRight = mode==='signup';
  return (
    <div className={"split-auth"+(visualOnRight?" reverse":"")} key={mode}>
      {!visualOnRight && <AuthVisual t={t} side="left"/>}
      <div className="auth-form-side">
        <div style={{width:'100%',maxWidth:formWidth}} className="fade-in">
          {children}
        </div>
      </div>
      {visualOnRight && <AuthVisual t={t} side="right"/>}
    </div>
  );
}

function LoginPage({t, lang, onLogin, onSwitchSignup, onBack, users, notice}){
  const [role,setRole] = useState('user');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  function submit(e){
    e.preventDefault();
    const found = users.find(u=> u.email.toLowerCase()===email.trim().toLowerCase() && u.password===password);
    if(!found){ setError(lang==='en'?'Invalid email or password.': lang==='te'?'తప్పు ఇమెయిల్ లేదా పాస్‌వర్డ్.':'गलत ईमेल या पासवर्ड।'); return; }
    if(found.role!==role){ setError(lang==='en'?`That account is registered as ${found.role}.`: lang==='te'?`ఆ ఖాతా ${found.role} గా నమోదైంది.`:`वह खाता ${found.role} के रूप में पंजीकृत है।`); return; }
    onLogin(found);
  }
  const roleOpts = [
    {key:'user', label:t('patientRole'), Icon:IconUser},
    {key:'doctor', label:t('doctorRole'), Icon:IconDoctor},
    {key:'admin', label:t('roleAdmin'), Icon:IconAdmin},
  ];
  const demoMap = {user:'user@mediqai.com / user123', doctor:'doctor@mediqai.com / doctor123', admin:'admin@mediqai.com / admin123'};
  return (
    <AuthShell t={t} mode="login" formWidth={360}>
      <BackButton t={t} onClick={onBack}/>
      <div onClick={onBack} style={{marginBottom:22}}><Brand/></div>
      {notice && (
        <div className="fade-in" style={{display:'flex',gap:10,alignItems:'flex-start',padding:'13px 16px',borderRadius:14,background:'var(--sage-light)',color:'var(--sage)',marginBottom:20,fontSize:'.86rem',lineHeight:1.5}}>
          <IconCheck size={17} style={{flexShrink:0,marginTop:2}}/>
          <div>
            <div style={{fontWeight:700}}>{t('accountCreatedTitle')}</div>
            <div style={{color:'var(--ink-soft)'}}>{t('accountCreatedBody')}</div>
          </div>
        </div>
      )}
      <h1 className="display" style={{fontSize:'1.9rem',margin:'0 0 6px'}}>{t('loginTitle')}</h1>
      <p style={{color:'var(--ink-soft)',margin:'0 0 26px',fontSize:'.94rem'}}>{t('loginSub')}</p>

      <div className="tabs" style={{width:'100%',marginBottom:22}}>
        {roleOpts.map(r=>(
          <button key={r.key} className={"tab"+(role===r.key?" active":"")} style={{flex:1,justifyContent:'center'}} onClick={()=>{setRole(r.key);setError('');}}>
            <r.Icon size={15}/>{r.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit}>
        <div style={{marginBottom:16}}>
          <label className="label">{t('email')}</label>
          <div style={{position:'relative'}}>
            <input className="input" style={{paddingLeft:42}} type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
            <IconMail size={17} style={{position:'absolute',left:14,top:14,color:'var(--ink-faint)'}}/>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <label className="label">{t('password')}</label>
          <div style={{position:'relative'}}>
            <input className="input" style={{paddingLeft:42}} type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
            <IconLock size={17} style={{position:'absolute',left:14,top:14,color:'var(--ink-faint)'}}/>
          </div>
        </div>
        {error && <div style={{color:'var(--danger)',fontSize:'.85rem',margin:'8px 0'}}>{error}</div>}
        <button type="submit" className="pillbtn solid" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:14,fontSize:'.96rem'}}>{t('login')}</button>
      </form>

      <div style={{marginTop:18,padding:'12px 14px',background:'var(--surface-2)',borderRadius:12,fontSize:'.78rem',color:'var(--ink-faint)'}}>
        <strong style={{color:'var(--ink-soft)'}}>{t('demoAccounts')}:</strong> {demoMap[role]}
      </div>

      <p style={{textAlign:'center',marginTop:22,fontSize:'.9rem',color:'var(--ink-soft)'}}>
        {t('noAccount')} <a onClick={onSwitchSignup} style={{color:'var(--primary)',fontWeight:700,cursor:'pointer'}}>{t('createOne')}</a>
      </p>
    </AuthShell>
  );
}

function SignupPage({t, lang, onSignup, onSwitchLogin, onBack, users, defaultRole}){
  const [role,setRole] = useState(defaultRole==='doctor' ? 'doctor' : 'user');
  const [name,setName] = useState('');
  const [gender,setGender] = useState('');
  const [age,setAge] = useState('');
  const [email,setEmail] = useState('');
  const [specialty,setSpecialty] = useState('');
  const [adminLevel,setAdminLevel] = useState('level1');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [error,setError] = useState('');
  function submit(e){
    e.preventDefault();
    if(password!==confirm){ setError(lang==='en'?'Passwords do not match.':lang==='te'?'పాస్‌వర్డ్‌లు సరిపోలలేదు.':'पासवर्ड मेल नहीं खाते।'); return; }
    if(users.some(u=>u.email.toLowerCase()===email.trim().toLowerCase())){ setError(lang==='en'?'An account with this email already exists.':lang==='te'?'ఈ ఇమెయిల్‌తో ఖాతా ఇప్పటికే ఉంది.':'इस ईमेल से खाता पहले से मौजूद है।'); return; }
    const newUser = {
      id:uid('user'), name:name.trim(), email:email.trim(), password, role,
      gender: gender||undefined, age: age? Number(age): undefined,
      specialty: role==='doctor'? (specialty||'General Physician'): undefined, adminLevel
    };
    onSignup(newUser);
  }
  return (
    <AuthShell t={t} mode="signup" formWidth={380}>
      <BackButton t={t} onClick={onBack}/>
      <div onClick={onBack} style={{marginBottom:22}}><Brand/></div>
      <h1 className="display" style={{fontSize:'1.9rem',margin:'0 0 6px'}}>{t('signupTitle')}</h1>
      <p style={{color:'var(--ink-soft)',margin:'0 0 24px',fontSize:'.94rem'}}>{t('signupSub')}</p>

      <label className="label">{t('iAmA')}</label>
      <div className="tabs" style={{width:'100%',marginBottom:18}}>
        <button type="button" className={"tab"+(role==='user'?" active":"")} style={{flex:1,justifyContent:'center'}} onClick={()=>setRole('user')}><IconUser size={15}/>{t('patientRole')}</button>
        <button type="button" className={"tab"+(role==='doctor'?" active":"")} style={{flex:1,justifyContent:'center'}} onClick={()=>setRole('doctor')}><IconDoctor size={15}/>{t('doctorRole')}</button>
        <button type="button" className={"tab"+(role==='admin'?" active":"")} style={{flex:1,justifyContent:'center'}} onClick={()=>setRole('admin')}><IconAdmin size={15}/>{t('adminRole')}</button>
      </div>

      <form onSubmit={submit}>
        <div style={{marginBottom:14}}>
          <label className="label">{t('fullName')}</label>
          <input className="input" required value={name} onChange={e=>setName(e.target.value)} placeholder="Ravi Kumar"/>
        </div>
        <div style={{display:'flex',gap:12,marginBottom:14}}>
          <div style={{flex:1}}>
            <label className="label">{t('gender')}</label>
            <select className="input" required value={gender} onChange={e=>setGender(e.target.value)}>
              <option value="" disabled>{t('gender')}</option>
              <option value="male">{t('genderMale')}</option>
              <option value="female">{t('genderFemale')}</option>
              <option value="other">{t('genderOther')}</option>
            </select>
          </div>
          <div style={{flex:1}}>
            <label className="label">{t('age')}</label>
            <div style={{position:'relative'}}>
              <input className="input" style={{paddingLeft:38}} type="number" min="1" max="120" required value={age} onChange={e=>setAge(e.target.value)} placeholder={t('agePlaceholder')}/>
              <IconCake size={16} style={{position:'absolute',left:13,top:15,color:'var(--ink-faint)'}}/>
            </div>
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label className="label">{t('email')}</label>
          <input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
        </div>
        {role==='doctor' && (
          <div style={{marginBottom:14}} className="fade-in">
            <label className="label">{t('specialty')}</label>
            <input className="input" value={specialty} onChange={e=>setSpecialty(e.target.value)} placeholder="General Physician"/>
          </div>
        )}
        {role==='admin' && (
          <div style={{marginBottom:14}} className="fade-in">
            <label className="label">{t('adminLevel')}</label>
            <select className="input" value={adminLevel} onChange={e=>setAdminLevel(e.target.value)}>
              <option value="level1">Level 1</option>
              <option value="level2">Level 2</option>
              <option value="level3">Level 3</option>
            </select>
          </div>
        )}
        <div style={{marginBottom:14}}>
          <label className="label">{t('password')}</label>
          <input className="input" type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
        </div>
        <div style={{marginBottom:6}}>
          <label className="label">{t('confirmPassword')}</label>
          <input className="input" type="password" required value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••"/>
        </div>
        {error && <div style={{color:'var(--danger)',fontSize:'.85rem',margin:'8px 0'}}>{error}</div>}
        <button type="submit" className="pillbtn solid" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:14,fontSize:'.96rem'}}>{t('signup')}</button>
      </form>

      <p style={{textAlign:'center',marginTop:22,fontSize:'.9rem',color:'var(--ink-soft)'}}>
        {t('haveAccount')} <a onClick={onSwitchLogin} style={{color:'var(--primary)',fontWeight:700,cursor:'pointer'}}>{t('logInInstead')}</a>
      </p>
    </AuthShell>
  );
}

/* ============================== USER: DISEASE GRID ============================== */

export { LoginPage, SignupPage };

