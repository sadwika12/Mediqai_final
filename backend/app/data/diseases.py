"""
Disease + weighted-symptom reference data.

This is a deliberate 1:1 mirror of frontend/src/data/diseases.js (ids and
symptom weights only — display strings/translations stay in the frontend).
Keeping both in sync means a prediction computed here and one computed by
the frontend's fallback engine (src/engine/prediction.js) always agree.

When the real biomedical datasets arrive, this module is the place to
either (a) replace SYMPTOM_WEIGHTS with learned feature importances, or
(b) drop this whole heuristic and have services/model.py call into a real
trained model instead.
"""

DISEASES = {
    "diabetes": {
        "name": "Diabetes",
        "symptoms": {
            "freq_urination": 3, "excess_thirst": 3, "weight_loss": 2,
            "fatigue_d": 1, "blurred_vision": 2, "slow_healing": 2, "tingling": 2,
        },
    },
    "heart": {
        "name": "Heart Disease",
        "symptoms": {
            "chest_pain": 3, "sob_h": 3, "fatigue_h": 1, "irregular_hb": 2,
            "swelling_legs": 2, "dizziness": 1, "cold_sweats": 2,
        },
    },
    "cancer": {
        "name": "Cancer Risk Screen",
        "symptoms": {
            "lump": 3, "skin_change": 2, "discharge": 2, "persistent_pain": 1,
            "weight_loss_c": 2, "fatigue_c": 1, "swelling_c": 2,
        },
    },
    "neuro": {
        "name": "Neurological Risk",
        "symptoms": {
            "memory_loss": 3, "confusion": 2, "speech_diff": 3,
            "numbness": 3, "severe_headache": 2, "balance": 2, "vision_change": 1,
        },
    },
    "kidney": {
        "name": "Kidney Disease",
        "symptoms": {
            "swelling_kd": 2, "fatigue_kd": 1, "urination_change": 3,
            "foamy_urine": 2, "back_pain": 1, "nausea_kd": 2, "appetite": 1,
        },
    },
    "respiratory": {
        "name": "Respiratory Disease",
        "symptoms": {
            "persistent_cough": 2, "wheezing": 3, "sob_r": 3, "chest_tightness": 2,
            "frequent_infections": 1, "fatigue_r": 1, "mucus": 2,
        },
    },
}


def get_disease(disease_id: str):
    return DISEASES.get(disease_id)
