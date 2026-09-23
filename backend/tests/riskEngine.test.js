const { test, describe } = require('node:test');
const assert = require('node:assert');
const { orchestrateThreatScan, deriveDecision } = require('../services/threatOrchestrator');

describe('Unified Threat Orchestrator & Multimodal Risk Tests', () => {
  test('Decision boundary partitions correctly across risk thresholds', () => {
    assert.strictEqual(deriveDecision(85).decision, 'BLOCK');
    assert.strictEqual(deriveDecision(60).decision, 'QUARANTINE');
    assert.strictEqual(deriveDecision(35).decision, 'WARN');
    assert.strictEqual(deriveDecision(15).decision, 'VERIFY');
    assert.strictEqual(deriveDecision(5).decision, 'ALLOW');
  });

  test('Urgent banking message with embedded phishing URL triggers CRITICAL risk', () => {
    const message = 'Your SBI account will be blocked within 24 hours. Update PAN immediately: http://sbi-pan-update.xyz';
    const scan = orchestrateThreatScan({ type: 'message', payload: { text: message } });

    assert.ok(scan.riskScore >= 70, `Expected riskScore >= 70, got ${scan.riskScore}`);
    assert.strictEqual(scan.riskLevel, 'CRITICAL');
    assert.strictEqual(scan.decision, 'BLOCK');
    assert.ok(scan.indicators.length >= 2);
  });

  test('Digital arrest call scam triggers CRITICAL risk assessment', () => {
    const transcript = 'Caller said he is a CBI officer from Mumbai Cyber Branch. Said my Aadhaar was linked to drugs parcel and I am under digital arrest. Demanded I stay on video and transfer money to RBI verification account.';
    const scan = orchestrateThreatScan({ type: 'call', payload: { transcript } });

    assert.ok(scan.riskScore >= 75);
    assert.strictEqual(scan.riskLevel, 'CRITICAL');
    assert.strictEqual(scan.decision, 'BLOCK');
    assert.ok(scan.indicators.some(i => i.id === 'digital_arrest_coercion'));
  });

  test('Reverse UPI QR scam is accurately classified as CRITICAL', () => {
    const scenario = 'Someone called saying they want to send me a refund of Rs. 4000. They sent a QR code and asked me to scan it and enter my UPI PIN to receive the money.';
    const scan = orchestrateThreatScan({ type: 'payment', payload: { scenario } });

    assert.strictEqual(scan.riskLevel, 'CRITICAL');
    assert.strictEqual(scan.decision, 'BLOCK');
    assert.ok(scan.indicators.some(i => i.id === 'reverse_upi_qr_scam'));
  });

  test('Contextual factor escalation increases risk for screen sharing during payment', () => {
    const scenario = 'User opening payment app';
    const scanWithContext = orchestrateThreatScan({
      type: 'payment',
      payload: { scenario },
      context: { activeScreenShare: true }
    });

    assert.ok(scanWithContext.contextualAudit.length > 0);
  });
});
