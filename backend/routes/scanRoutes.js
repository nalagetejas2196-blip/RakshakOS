const express = require('express');
const router = express.Router();
const { orchestrateThreatScan } = require('../services/threatOrchestrator');

router.post('/url', (req, res) => {
  try {
    const { url, context } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Missing required field: url' });
    }
    const result = orchestrateThreatScan({ type: 'url', payload: { url }, context });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/message', (req, res) => {
  try {
    const { text, message, context } = req.body;
    const content = text || message;
    if (!content) {
      return res.status(400).json({ error: 'Missing required field: text/message' });
    }
    const result = orchestrateThreatScan({ type: 'message', payload: { text: content }, context });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/email', (req, res) => {
  try {
    const { sender, subject, body, links, context } = req.body;
    if (!sender && !subject && !body) {
      return res.status(400).json({ error: 'Provide at least one of: sender, subject, or body' });
    }
    const result = orchestrateThreatScan({ type: 'email', payload: { sender, subject, body, links }, context });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/call', (req, res) => {
  try {
    const { transcript, description, context } = req.body;
    const content = transcript || description;
    if (!content) {
      return res.status(400).json({ error: 'Provide transcript or description of the call' });
    }
    const result = orchestrateThreatScan({ type: 'call', payload: { transcript: content }, context });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/payment', (req, res) => {
  try {
    const { scenario, context } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: 'Missing required field: scenario' });
    }
    const result = orchestrateThreatScan({ type: 'payment', payload: { scenario }, context });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/deepfake', (req, res) => {
  try {
    const { mode, scenarioDescription, mediaType, impersonatedEntity, financialDemandAmount, context } = req.body;
    const result = orchestrateThreatScan({
      type: 'deepfake',
      payload: { mode, scenarioDescription, mediaType, impersonatedEntity, financialDemandAmount },
      context
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
