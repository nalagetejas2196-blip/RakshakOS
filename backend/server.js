/**
 * RakshakOS API Server — Unified AI Cyber-Fraud Defense Engine
 * Smart India Hackathon (SIH 2026) — Student Innovation Prototype
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const scanRoutes = require('./routes/scanRoutes');
const intelRoutes = require('./routes/intelRoutes');
const researchRoutes = require('./routes/researchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '5mb' }));

// Request logger for demonstrator debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[RakshakOS] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'RakshakOS Unified Threat Orchestrator',
    prototypeVersion: '3.0-SIH2026-StudentInnovation',
    edition: 'Smart India Hackathon 2026',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    activeModules: [
      'PhishNet-URL-Engine',
      'SMS-Message-Analyzer',
      'Email-Fraud-Detector',
      'Call-Vishing-Analyzer',
      'OTP-Payment-Scam-Guard',
      'Deepfake-Context-Research-Module'
    ]
  });
});

// API Routes
app.use('/api/scan', scanRoutes);
app.use('/api/intel', intelRoutes);
app.use('/api/research', researchRoutes);

const path = require('path');
const fs = require('fs');

const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Fallback 404 handler for API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found on RakshakOS Threat Engine' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[RakshakOS Server Error]', err);
  res.status(500).json({
    error: 'Internal Threat Engine Error',
    message: err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`🛡️  RakshakOS Unified AI Cyber-Fraud Defense Engine Active`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🔬 Mode: Smart India Hackathon (SIH 2026) Student Innovation Prototype`);
  console.log(`📡 Health: http://0.0.0.0:${PORT}/api/health`);
  console.log(`================================================================`);
});

module.exports = app;
