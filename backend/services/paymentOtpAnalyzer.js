/**
 * OTP / Payment Fraud Scenario Detector — RakshakOS Multimodal Threat Engine
 *
 * Specializes in reverse-UPI scams, fraudulent refund pretexts,
 * QR code confusion (scan to receive money misconception), and coerced OTP disclosure.
 */

const PAYMENT_FRAUD_PATTERNS = [
  {
    id: 'reverse_upi_qr_scam',
    title: 'Reverse UPI QR Scam ("Scan to Receive Money")',
    keywords: [
      'scan qr to receive', 'scan to receive payment', 'scan qr for refund',
      'scan and enter pin', 'enter upi pin to receive', 'enter pin to receive',
      'scan qr code', 'receive money via qr'
    ],
    regex: /(scan.*qr.*receive|scan.*enter.*pin|enter.*pin.*to receive|qr.*refund|receive.*enter.*pin)/i,
    severity: 'CRITICAL',
    weight: 75,
    reason: 'Fundamental UPI rule violation: Scanning a QR code or entering a UPI PIN ALWAYS DEBITS money, it never credits money.',
    action: 'NEVER scan a QR code or enter your UPI PIN to receive money.'
  },
  {
    id: 'otp_for_refund_pretext',
    title: 'OTP Required for Refund Pretext',
    keywords: ['share otp to receive refund', 'otp for cashback', 'otp to credit money', 'give otp to reverse transaction', 'refund verification code'],
    severity: 'CRITICAL',
    weight: 55,
    reason: 'OTPs are cryptographic authorizations for outgoing debits. You NEVER need an OTP to receive money or refunds.',
    action: 'DO NOT disclose the OTP. Banks never ask for OTPs to deposit money.'
  },
  {
    id: 'fake_customer_support_upi',
    title: 'Imposter Customer Care / Delivery Refund',
    keywords: ['google pay customer care', 'phonepe refund support', 'paytm executive', 'swiggy refund call', 'zomato refund', 'courier parcel held'],
    severity: 'HIGH',
    weight: 35,
    reason: 'Scammers post fake customer care numbers online or call impersonating delivery/payment platforms.',
    action: 'Only raise refund tickets directly inside the verified app interface.'
  },
  {
    id: 'screen_sharing_payment',
    title: 'Screen Sharing During Payment Session',
    keywords: ['share screen while paying', 'open google pay on screen share', 'enter pin while on call', 'anydesk upi'],
    severity: 'CRITICAL',
    weight: 50,
    reason: 'Screen sharing tools broadcast credentials and passwords in real-time to the scammer.',
    action: 'Immediately end screen sharing before handling any financial applications.'
  },
  {
    id: 'overpayment_fake_screenshot',
    title: 'Overpayment / Accidental Transfer Scam',
    keywords: ['sent extra money by mistake', 'refund the excess amount', 'sent 50000 instead of 5000', 'showed fake payment screenshot'],
    severity: 'HIGH',
    weight: 40,
    reason: 'Fraudsters send spoofed payment SMS or fake screenshot and demand urgent refund before you check actual bank balance.',
    action: 'Log in to your bank app directly to verify actual ledger balance, not SMS alerts.'
  }
];

function analyzePaymentScenario(scenarioText) {
  if (!scenarioText || !scenarioText.trim()) {
    return {
      riskLevel: 'LOW',
      riskScore: 0,
      decision: 'ALLOW',
      status: 'EMPTY',
      reasons: ['No payment or OTP scenario provided.'],
      indicators: [],
      safetyGuidance: []
    };
  }

  const text = scenarioText.toLowerCase();
  const indicators = [];
  const reasons = [];
  const safetyGuidance = [];
  let score = 10;

  for (const pattern of PAYMENT_FRAUD_PATTERNS) {
    const matchedKw = pattern.keywords.filter(kw => text.includes(kw));
    const matchedRegex = pattern.regex && pattern.regex.test(text);
    if (matchedKw.length > 0 || matchedRegex) {
      score += pattern.weight;
      indicators.push({
        id: pattern.id,
        title: pattern.title,
        severity: pattern.severity,
        weight: pattern.weight,
        description: pattern.reason
      });
      reasons.push(pattern.reason);
      safetyGuidance.push(pattern.action);
    }
  }

  // General heuristics for any OTP mention combined with financial terms
  const hasOtp = /otp|one time password|pin|code|6 digit/i.test(text);
  const hasReceive = /receive|refund|credit|cashback|collect|deposit/i.test(text);
  if (hasOtp && hasReceive && indicators.length === 0) {
    score += 45;
    indicators.push({
      id: 'generic_otp_receive_anomaly',
      title: 'Incompatible OTP + Crediting Flow',
      severity: 'CRITICAL',
      weight: 45,
      description: 'Request pairs an OTP authorization with incoming money.'
    });
    reasons.push('Receiving funds never necessitates disclosing an OTP to another human or entering it into an untrusted form.');
    safetyGuidance.push('Refuse to provide the OTP. Check your account statement via official mobile banking.');
  }

  const normalizedScore = Math.min(100, Math.max(5, score));

  let riskLevel = 'LOW';
  let decision = 'ALLOW';
  let status = 'NORMAL_TRANSACTION';

  if (normalizedScore >= 70) {
    riskLevel = 'CRITICAL';
    decision = 'BLOCK';
    status = 'PAYMENT_FRAUD_ATTEMPT';
  } else if (normalizedScore >= 40) {
    riskLevel = 'HIGH';
    decision = 'QUARANTINE';
    status = 'HIGH_RISK_SCENARIO';
  } else if (normalizedScore >= 20) {
    riskLevel = 'MEDIUM';
    decision = 'WARN';
    status = 'SUSPICIOUS_PAYMENT_FLOW';
  }

  return {
    scenario: scenarioText,
    riskLevel,
    riskScore: normalizedScore,
    decision,
    status,
    indicators,
    reasons: reasons.length > 0 ? reasons : ['No signature anomalies or reverse-payment patterns detected in scenario.'],
    safetyGuidance: safetyGuidance.length > 0 ? safetyGuidance : ['Follow standard payment security. Never share PINs with third parties.'],
    recommendation: riskLevel === 'CRITICAL' ? 'HALT TRANSACTION IMMEDIATELY. This is a textbook financial social engineering scam.' : 'Verify transaction details in official bank app.'
  };
}

module.exports = {
  analyzePaymentScenario
};
