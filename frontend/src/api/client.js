/*
 * API client — not wired up yet.
 *
 * Right now the whole app persists everything to localStorage via
 * src/utils/storage.js, exactly as the assignment's tech stack asks for
 * ("storage: local storage"). This file exists so that swapping in the
 * Python backend later is a small, mechanical change rather than a rewrite:
 *
 *   1. Point BASE_URL below at your running FastAPI server
 *      (see backend/app/main.py — it already exposes matching routes).
 *   2. In App.jsx, change the import
 *        import { LS, lsGet, lsSet, uid, seedIfNeeded } from './utils/storage.js';
 *      to import the equivalent functions from this file instead.
 *   3. Each function here has the same name/shape as its localStorage
 *      counterpart (login, signup, listUsers, submitPrediction,
 *      listRecords, saveDoctorReview) so call sites barely change.
 *
 * Nothing in this file is imported by the app yet — it's here so the
 * next milestone (real backend + real DB + real model) has a clear,
 * pre-built landing spot instead of starting from scratch.
 */

const BASE_URL = 'http://localhost:8000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function login(email, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function signup(user) {
  return request('/auth/signup', { method: 'POST', body: JSON.stringify(user) });
}

export function listUsers() {
  return request('/users');
}

export function submitPrediction({ userId, diseaseId, inputMethod, selectedIds }) {
  return request('/predict', {
    method: 'POST',
    body: JSON.stringify({ userId, diseaseId, inputMethod, selectedIds }),
  });
}

export function listRecords(userId) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  return request(`/records${query}`);
}

export function saveDoctorReview(recordId, review) {
  return request(`/records/${recordId}/review`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
}
