/**
 * Threat Intelligence Store — RakshakOS Intelligence Layer
 *
 * Provides curated Indicators of Compromise (IOCs) across active Indian and global
 * cyber-fraud campaigns: typosquats, phishing domains, malicious SMS sender headers,
 * mule UPI handles, and APK hashes.
 *
 * Explicitly designated as "Demonstration Threat Intelligence" with an extensible
 * adapter layer ready for live MISP, AlienVault OTX, or VirusTotal feeds.
 */

const SEEDED_INTEL_FEEDS = [
  {
    id: 'ioc-2026-0891',
    indicator: 'sbi-kyc-verify-portal.top',
    type: 'Domain / FQDN',
    category: 'Banking Phishing / Credential Harvester',
    severity: 'CRITICAL',
    confidence: '98%',
    source: 'Demonstration Threat Intelligence (CERT-In PhishNet Feed)',
    firstSeen: '2026-09-18T04:22:00Z',
    status: 'ACTIVE_BLOCK',
    tags: ['SBI', 'Phishing', 'Fast-Flux DNS']
  },
  {
    id: 'ioc-2026-0892',
    indicator: 'electricity-bill-update.online',
    type: 'Domain / FQDN',
    category: 'Utility Smishing / Malicious APK Dropper',
    severity: 'CRITICAL',
    confidence: '95%',
    source: 'Demonstration Threat Intelligence (CERT-In PhishNet Feed)',
    firstSeen: '2026-09-20T11:15:30Z',
    status: 'ACTIVE_BLOCK',
    tags: ['Mahavitaran', 'BSES', 'Dropper APK']
  },
  {
    id: 'ioc-2026-0893',
    indicator: 'VM-SBIINB / BP-SBIPAN',
    type: 'SMS Sender Header',
    category: 'Spoofed Transactional SMS Header',
    severity: 'HIGH',
    confidence: '91%',
    source: 'Demonstration Threat Intelligence (TRAI DLT Scrutiny)',
    firstSeen: '2026-09-21T09:40:00Z',
    status: 'SUSPICIOUS_MONITOR',
    tags: ['SMS Phishing', 'DLT Abuse']
  },
  {
    id: 'ioc-2026-0894',
    indicator: 'secure-income-tax-refund.xyz',
    type: 'Domain / FQDN',
    category: 'Tax Refund Phishing / Banking Trojan',
    severity: 'CRITICAL',
    confidence: '97%',
    source: 'Demonstration Threat Intelligence (PhishNet ML Repository)',
    firstSeen: '2026-09-22T06:10:00Z',
    status: 'ACTIVE_BLOCK',
    tags: ['ITR Refund', 'Typosquatting']
  },
  {
    id: 'ioc-2026-0895',
    indicator: 'refund.merchant9821@okaxis',
    type: 'VPA / UPI Handle',
    category: 'Reverse QR Social Engineering Mule Account',
    severity: 'HIGH',
    confidence: '89%',
    source: 'Demonstration Threat Intelligence (NPCI Mule Registry Demo)',
    firstSeen: '2026-09-22T14:32:00Z',
    status: 'FLAGGED_INVESTIGATION',
    tags: ['Reverse UPI', 'Mule Handle']
  },
  {
    id: 'ioc-2026-0896',
    indicator: 'telegram.me/parttime_youtube_tasks_vip',
    type: 'Social Channel / URL',
    category: 'Task-Based Work-From-Home Ponzi Scam',
    severity: 'HIGH',
    confidence: '94%',
    source: 'Demonstration Threat Intelligence (CyberCrime Co-ord Feed)',
    firstSeen: '2026-09-23T01:05:00Z',
    status: 'ACTIVE_MONITOR',
    tags: ['Task Scam', 'Prepaid Deposit Trap']
  },
  {
    id: 'ioc-2026-0897',
    indicator: 'cbi-digital-investigation-desk.site',
    type: 'Domain / FQDN',
    category: 'Digital Arrest Impersonation Landing Page',
    severity: 'CRITICAL',
    confidence: '99%',
    source: 'Demonstration Threat Intelligence (National Cyber Threat Hub)',
    firstSeen: '2026-09-23T18:20:00Z',
    status: 'ACTIVE_BLOCK',
    tags: ['Digital Arrest', 'CBI Impersonation']
  }
];

function getThreatIntelligence({ query = '', category = '', limit = 50 }) {
  let results = [...SEEDED_INTEL_FEEDS];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(item =>
      item.indicator.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'ALL') {
    results = results.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
  }

  return {
    meta: {
      type: 'Demonstration Threat Intelligence',
      totalTracked: SEEDED_INTEL_FEEDS.length,
      matchingCount: results.length,
      disclosure: 'Seeded demonstration indicators representing active regional cyber fraud campaigns. Extensible to live API connectors (MISP, OTX, VT).'
    },
    indicators: results.slice(0, limit)
  };
}

module.exports = {
  getThreatIntelligence,
  SEEDED_INTEL_FEEDS
};
