# RakshakOS Deployment Guide

This document details the configuration for deploying **RakshakOS** onto free and low-cost cloud hosting platforms (Vercel, Render, Railway, or Docker).

---

## 1. Architecture Overview for Production

```
┌─────────────────────────────────┐
│     Frontend (Vercel / Netlify) │  <-- SPA (React + Vite, Tailwind CSS)
└────────────────┬────────────────┘
                 │ /api requests
                 ▼
┌─────────────────────────────────┐
│     Backend (Render / Railway)  │  <-- REST API (Node.js / Express)
└─────────────────────────────────┘
```

---

## 2. Deploying Backend to Render (Free Tier)

1. Connect your GitHub repository to [Render.com](https://render.com).
2. Choose **Web Service** using the included `render.yaml` blueprint or manual settings:
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Environment variables:
   - `PORT`: `10000`
   - `NODE_ENV`: `production`
   - `VT_API_KEY` (optional)
   - `GOOGLE_SAFE_BROWSING_API_KEY` (optional)
4. Your API will be live at: `https://rakshakos-backend.onrender.com`.

---

## 3. Deploying Frontend to Vercel (Free Tier)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set configuration:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. If using a separate backend on Render, add a rewrite rule in `frontend/vercel.json` pointing `/api/(.*)` to your Render URL.

---

## 4. Local Production Test

To test the compiled production build locally:

```bash
# In backend
cd backend
npm start

# In frontend
cd frontend
npm run build
npm run preview
```
