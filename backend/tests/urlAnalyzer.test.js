const { test, describe } = require('node:test');
const assert = require('node:assert');
const { analyzeUrl, checkTyposquatting } = require('../services/phishnetService');

describe('PhishNet URL Analyzer Tests', () => {
  test('Identifies verified legitimate banking domain with HTTPS as SAFE', () => {
    const result = analyzeUrl('https://onlinesbi.sbi');
    assert.strictEqual(result.riskLevel, 'LOW');
    assert.strictEqual(result.decision, 'ALLOW');
    assert.strictEqual(result.status, 'SAFE');
  });

  test('Flags direct typosquatting of State Bank of India with HIGH or CRITICAL risk', () => {
    const result = analyzeUrl('http://sbi-online-kyc-verification.com/login.php');
    assert.ok(result.riskScore >= 50, `Expected riskScore >= 50, got ${result.riskScore}`);
    assert.ok(['HIGH', 'CRITICAL'].includes(result.riskLevel));
    assert.ok(['QUARANTINE', 'BLOCK'].includes(result.decision));
    assert.ok(result.indicators.some(i => i.id === 'typosquatting_detected'));
  });

  test('Flags raw numeric IP address hostnames', () => {
    const result = analyzeUrl('http://192.168.1.105/update-pan.html');
    assert.ok(result.indicators.some(i => i.id === 'raw_ip_host'));
    assert.ok(result.riskScore >= 45);
  });

  test('Detects typosquatting similarity for lookalike domains', () => {
    const check = checkTyposquatting('amaz0n-security.com');
    assert.strictEqual(check.isTyposquat, true);
    assert.strictEqual(check.brand, 'amazon.com');
  });

  test('Flags suspicious high-abuse TLDs with sensitive keywords', () => {
    const result = analyzeUrl('https://secure-refund-portal.top');
    assert.ok(result.indicators.some(i => i.id === 'suspicious_tld'));
  });
});
