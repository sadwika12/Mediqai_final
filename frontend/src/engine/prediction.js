/*
 * Prediction engine placeholder.
 * This mirrors backend/app/services/model.py so the frontend demo
 * behaves identically whether it's running fully client-side (current
 * mode, using localStorage) or later wired up to call POST /api/predict.
 * Replace the body of computePrediction() with a real API call (see
 * src/api/client.js) once the Python hybrid quantum-classical model is
 * ready to serve predictions.
 */
function computePrediction(disease, selectedIds){
  const totalWeight = disease.symptoms.reduce((s,x)=>s+x.w,0);
  const selected = disease.symptoms.filter(s=>selectedIds.includes(s.id));
  const selectedWeight = selected.reduce((s,x)=>s+x.w,0);
  let score = totalWeight>0 ? Math.round((selectedWeight/totalWeight)*100) : 0;
  // small deterministic jitter based on id so repeated identical inputs look "modeled" not just linear
  const jitter = (selected.length*7) % 5;
  score = Math.max(2, Math.min(98, score + jitter - 2));
  const riskLevel = score < 34 ? 'low' : score < 67 ? 'medium' : 'high';
  const contributors = selected.slice().sort((a,b)=>b.w-a.w).slice(0,4).map(s=>({
    id:s.id, label:s.label, pct: Math.round((s.w/(selectedWeight||1))*100)
  }));
  return { score, riskLevel, contributors, selectedCount:selected.length, totalCount:disease.symptoms.length };
}

/* For users who don't know their condition: score every condition against the
   symptoms they reported and rank the ones that matched at least one sign. */
function rankDiseases(diseases, selectedIds){
  return diseases
    .map(disease=>({
      disease,
      result: computePrediction(disease, selectedIds),
      hits: disease.symptoms.filter(s=>selectedIds.includes(s.id)),
    }))
    .filter(x=>x.hits.length>0)
    .sort((a,b)=> b.result.score - a.result.score || b.hits.length - a.hits.length);
}

const RISK_COLOR = { low:'var(--sage)', medium:'var(--amber)', high:'var(--danger)' };
function riskLabelKey(r){ return r==='low'?'riskLow':r==='medium'?'riskMedium':'riskHigh'; }

export { computePrediction, rankDiseases, RISK_COLOR, riskLabelKey };
