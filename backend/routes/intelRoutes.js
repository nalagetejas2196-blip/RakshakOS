const express = require('express');
const router = express.Router();
const { getThreatIntelligence } = require('../services/threatIntelStore');

router.get('/', (req, res) => {
  try {
    const { q, category, limit } = req.query;
    const data = getThreatIntelligence({ query: q, category, limit: Number(limit) || 50 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
