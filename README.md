# MediQAI — Hybrid Quantum-Classical Health Screening Platform

A role-based (Patient / Doctor / Admin) health-screening web app, built
as a proper **React (Vite) frontend** + **Python (FastAPI) backend**,
with **localStorage** as the current persistence layer, as requested.
Predictions are computed by a transparent weighted-symptom heuristic
standing in for the hybrid quantum-classical model (VQC / QSVM)
described in the problem statement — clearly marked wherever it lives
in the code, so swapping in the real model is a small, contained change.

```
MediQAI/
├── frontend/     React (Vite) app — what the user actually opens in a browser
└── backend/      FastAPI app — API layer, ready to take over persistence
                  and predictions once a real DB + model exist
```

## Why two "prediction engines"?

`frontend/src/engine/prediction.js` and `backend/app/services/model.py`
are intentionally identical heuristics. Today, the frontend runs fully
client-side (localStorage handles everything, per the assignment's
current tech-stack requirement) so `engine/prediction.js` is what
actually computes your risk scores. `services/model.py` exists so the
backend is already a drop-in replacement — see "Growing this into a
real product" below.

## Running it

### Frontend
```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

### Backend (optional right now — not called by the frontend yet)
```bash
cd backend
python -m venv venv && source venv/bin/activate   # or your preferred env
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000/docs
```

## Demo accounts
| Role    | Email                  | Password   |
|---------|-------------------------|-----------|
| Patient | user@mediqai.com        | user123   |
| Doctor  | doctor@mediqai.com      | doctor123 |
| Doctor  | doctor2@mediqai.com     | doctor123 |
| Admin   | admin@mediqai.com       | admin123  |

You can also sign up as a new Patient or Doctor from the Sign Up page.

## Requirements checklist

| Requirement | Where it lives |
|---|---|
| Role-based access: user / doctor / admin, separate logins | `src/App.jsx`, `src/pages/Auth.jsx` |
| Login/signup with neat UI; public info visible when logged out | `src/pages/Auth.jsx` (`LandingPage`, `LoginPage`, `SignupPage`) |
| Topbar: brand name + pulse icon, login/signup, changes after login | `src/components/common.jsx` (`Brand`, `TopBar`) |
| Sidebar: home, history, health info, tips, symptoms guide, chatbot/form/upload | `src/components/common.jsx` (`Sidebar`) |
| Disease icon grid → visual, click-through input | `src/pages/DiseaseFlow.jsx` (`DiseaseGrid`) |
| Chatbot (dummy responses), symptom form, report upload | `src/pages/DiseaseFlow.jsx` (`ChatbotPanel`, `FormPanel`, `UploadPanel`) |
| Review → Predict → risk + disease + explainability + actions | `src/pages/DiseaseFlow.jsx` (`ReviewScreen`, `ResultScreen`) |
| History page | `src/pages/UserPages.jsx` (`HistoryPage`) |
| Doctor: cross-check AI vs patient input, agree/disagree + notes | `src/pages/DoctorPages.jsx` |
| Admin: doctor feedback, model overview, user list | `src/pages/AdminPages.jsx` |
| Dummy data throughout | `src/utils/storage.js` (`seedIfNeeded`), `backend/app/data/seed.py` |
| React frontend | `frontend/` (Vite, real npm project — no CDN hacks) |
| Python backend | `backend/` (FastAPI) |
| localStorage persistence | `src/utils/storage.js` |
| Multilingual: English / Telugu / Hindi | `src/data/translations.js` |
| Splash animation: stethoscope → MediQAI wordmark | `src/components/common.jsx` (`SplashScreen`) |

## Growing this into a real product

The project is deliberately split so each future milestone touches one
place:

1. **Real database** — `backend/app/database.py` has a commented-out
   SQLAlchemy scaffold (User / PredictionRecord models) ready to
   uncomment. Point `app/data/seed.py`'s helper functions at real
   queries instead of the in-memory lists; router code doesn't change.
2. **Real ML model** — `backend/app/services/model.py`'s `predict()`
   function is the single place the hybrid quantum-classical model
   plugs in. Everything downstream (API response shape, frontend)
   already expects its current output shape.
3. **Real API-backed frontend** — `frontend/src/api/client.js` already
   mirrors every backend route. Swap the `utils/storage.js` import in
   `App.jsx` for `api/client.js` once you're ready to stop using
   localStorage as the source of truth.
4. **Auth security** — passwords are stored/compared in plaintext in
   both the frontend seed data and the backend dummy store. Add
   hashing (bcrypt/passlib) and real session tokens (JWT) before this
   goes anywhere near real users.

## Note

This is a demonstration/course-project build. Predictions come from a
transparent weighted-symptom formula, not a real diagnostic model, and
are **not** medical advice — see the in-app disclaimer on every result
screen.
