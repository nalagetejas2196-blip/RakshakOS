/**
 * RakshakOS Frontend API Client & Resilient Fallback Layer
 */

const API_BASE = '/api';

async function safeFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[RakshakOS API Request Failed: ${endpoint}]`, err.message);
    throw err;
  }
}

export const api = {
  scanUrl: (url, context = {}) =>
    safeFetch('/scan/url', {
      method: 'POST',
      body: JSON.stringify({ url, context })
    }),

  scanMessage: (text, context = {}) =>
    safeFetch('/scan/message', {
      method: 'POST',
      body: JSON.stringify({ text, context })
    }),

  scanEmail: (payload, context = {}) =>
    safeFetch('/scan/email', {
      method: 'POST',
      body: JSON.stringify({ ...payload, context })
    }),

  scanCall: (transcript, context = {}) =>
    safeFetch('/scan/call', {
      method: 'POST',
      body: JSON.stringify({ transcript, context })
    }),

  scanPayment: (scenario, context = {}) =>
    safeFetch('/scan/payment', {
      method: 'POST',
      body: JSON.stringify({ scenario, context })
    }),

  scanDeepfake: (payload, context = {}) =>
    safeFetch('/scan/deepfake', {
      method: 'POST',
      body: JSON.stringify({ ...payload, context })
    }),

  getThreatIntel: (q = '', category = 'ALL') =>
    safeFetch(`/intel?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`),

  getResearchMetrics: () =>
    safeFetch('/research/metrics'),

  getHealth: () =>
    safeFetch('/health')
};
