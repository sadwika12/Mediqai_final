import { diseaseById } from '../data/diseases.js';
import { computePrediction } from '../engine/prediction.js';

/*
 * localStorage-backed persistence layer.
 *
 * Every read/write to browser storage in this app goes through this file.
 * To move to a real backend later: keep the same function signatures
 * (lsGet/lsSet/uid/seedIfNeeded) but have them call src/api/client.js
 * instead of localStorage — nothing else in the app needs to change.
 */
const LS = {
  users:'mediqai_users', session:'mediqai_session', records:'mediqai_predictions', seeded:'mediqai_seeded_v1'
};
function lsGet(key, fallback){ try{ const v = localStorage.getItem(key); return v? JSON.parse(v): fallback; }catch(e){ return fallback; } }
function lsSet(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }

function uid(prefix){ return prefix+'_'+Math.random().toString(36).slice(2,9); }

function seedIfNeeded(){
  if(lsGet(LS.seeded,false)) return;
  const users = [
    {id:'u_admin', name:'Admin', email:'admin@mediqai.com', password:'admin123', role:'admin'},
    {id:'u_doc1', name:'Dr. Ananya Rao', email:'doctor@mediqai.com', password:'doctor123', role:'doctor', specialty:'General Physician'},
    {id:'u_doc2', name:'Dr. Sameer Khan', email:'doctor2@mediqai.com', password:'doctor123', role:'doctor', specialty:'Cardiologist'},
    {id:'u_user1', name:'Ravi Kumar', email:'user@mediqai.com', password:'user123', role:'user'},
    {id:'u_user2', name:'Lakshmi Devi', email:'lakshmi@mediqai.com', password:'user123', role:'user'},
  ];
  lsSet(LS.users, users);

  function mkRecord(userId,userName,diseaseId,selectedIds,method,daysAgo,doctorReview){
    const d = diseaseById(diseaseId);
    const result = computePrediction(d, selectedIds);
    return {
      id:uid('rec'), userId, userName, diseaseId, inputMethod:method,
      selectedIds, result,
      timestamp: Date.now() - daysAgo*86400000,
      doctorReview: doctorReview || null
    };
  }
  const records = [
    mkRecord('u_user1','Ravi Kumar','diabetes',['freq_urination','excess_thirst','fatigue_d'],'form',10,
      {doctorId:'u_doc1', doctorName:'Dr. Ananya Rao', verdict:'agree', comment:'Consistent with early-stage indicators.', timestamp:Date.now()-9*86400000}),
    mkRecord('u_user1','Ravi Kumar','heart',['chest_pain','sob_h','cold_sweats'],'chatbot',5,null),
    mkRecord('u_user2','Lakshmi Devi','respiratory',['wheezing','sob_r','persistent_cough'],'form',3,
      {doctorId:'u_doc2', doctorName:'Dr. Sameer Khan', verdict:'disagree', comment:'Patient has diagnosed asthma already; risk score should weight known history, model over-flagged as new onset.', timestamp:Date.now()-2*86400000}),
    mkRecord('u_user2','Lakshmi Devi','kidney',['fatigue_kd','back_pain'],'upload',1,null),
    mkRecord('u_user1','Ravi Kumar','neuro',['severe_headache','vision_change'],'form',20,
      {doctorId:'u_doc1', doctorName:'Dr. Ananya Rao', verdict:'agree', comment:'Low risk correctly identified, migraine-pattern symptoms only.', timestamp:Date.now()-19*86400000}),
  ];
  lsSet(LS.records, records);
  lsSet(LS.seeded, true);
}

export { LS, lsGet, lsSet, uid, seedIfNeeded };
