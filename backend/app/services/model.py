"""
Prediction "model" — currently a transparent weighted-symptom heuristic,
standing in for the hybrid quantum-classical model (VQC / QSVM) described
in the problem statement.

This intentionally mirrors frontend/src/engine/prediction.js exactly, so
a screening run gives the same result whether it's computed client-side
(current default) or server-side (once the frontend is pointed at this
API — see frontend/src/api/client.js).

--- Where the real model plugs in --------------------------------------
Replace the body of `predict()` below with a call into your trained
hybrid quantum-classical pipeline, e.g.:

    from qiskit_machine_learning.algorithms import VQC
    _vqc = VQC.load("models/vqc_diabetes.model")

    def predict(disease_id, selected_ids):
        features = build_feature_vector(disease_id, selected_ids)
        score, confidence = _vqc.predict_proba(features)
        ...

Everything downstream (routers/predict.py, the response schema, the
frontend) only cares about the shape returned by `predict()`, so the
heuristic can be swapped out without touching any other file.
-------------------------------------------------------------------------
"""

from app.data.diseases import get_disease


def risk_level(score: int) -> str:
    if score < 34:
        return "low"
    if score < 67:
        return "medium"
    return "high"


def predict(disease_id: str, selected_ids: list[str]) -> dict:
    disease = get_disease(disease_id)
    if disease is None:
        raise ValueError(f"Unknown disease id: {disease_id}")

    weights = disease["symptoms"]
    total_weight = sum(weights.values())
    selected = [sid for sid in selected_ids if sid in weights]
    selected_weight = sum(weights[sid] for sid in selected)

    score = round((selected_weight / total_weight) * 100) if total_weight else 0
    jitter = (len(selected) * 7) % 5
    score = max(2, min(98, score + jitter - 2))

    contributors = sorted(
        ({"id": sid, "weight": weights[sid]} for sid in selected),
        key=lambda c: c["weight"],
        reverse=True,
    )[:4]
    for c in contributors:
        c["pct"] = round((c["weight"] / selected_weight) * 100) if selected_weight else 0

    return {
        "score": score,
        "riskLevel": risk_level(score),
        "contributors": contributors,
        "selectedCount": len(selected),
        "totalCount": len(weights),
    }
