/**
 * Message / SMS Scam Analyzer — RakshakOS Multimodal Threat Engine
 *
 * Evaluates inbound communications (SMS, WhatsApp, Telegram, RCS) for
 * social engineering tactics, urgency heuristics, OTP extortion, banking
 * impersonation, and extracted URL destinations.
 */

const { analyzeUrl } = require('./phishnetService');

const URGENCY_TRIGGERS = [
  // English
  'immediately', 'urgent', 'act now', 'within 24 hours', 'within 2 hours',
  'blocked today', 'suspended immediately', 'account deactivated',
  'electricity power will be cut', 'disconnect tonight', 'last warning',
  'legal action', 'police complaint', 'court order', 'arrest warrant',
  // Marathi
  'लगेच', 'तात्काळ', 'त्वरित', 'आज रात्री', 'बंद होईल', 'वीज खंडित होईल',
  'कारवाई', 'शेवटची संधी', 'तात्पुरते निलंबित', 'खाते ब्लॉक',
  // Hindi
  'तुरंत', 'जल्द ही', 'आज रात', 'बिजली कट जाएगी', 'खाता बंद',
  'अंतिम चेतावनी', 'कानूनी कार्रवाई', 'अवरुद्ध'
];

const OTP_CREDENTIAL_TRIGGERS = [
  // English
  'share otp', 'send otp', 'provide otp', 'tell the code', 'forward pin',
  'update pan', 'submit aadhaar', 'kyc verification', 'verify your identity',
  'enter password', 'bank details', 'cvv', 'atm pin',
  // Marathi
  'ओटीपी सांगा', 'ओटीपी पाठवा', 'पॅन अपडेट', 'केवायसी', 'आधार क्रमांक',
  'पासवर्ड सांगा', 'पिन नंबर',
  // Hindi
  'ओटीपी बताएं', 'ओटीपी भेजें', 'पैन अपडेट', 'केवाईसी', 'आधार नंबर',
  'पासवर्ड दर्ज करें', 'पिन साझा करें'
];

const FINANCIAL_INDUCEMENTS = [
  // English
  'won lottery', 'lucky winner', 'cash prize', 'cashback credited',
  'instant refund', 'part-time job', 'earn 5000 daily', 'like youtube videos',
  'telegram task', 'guaranteed profit', 'crypto bonus', 'double your money',
  'work from home', 'selected for award',
  // Marathi
  'लॉटरी जिंकली', 'बक्षीस', 'रिफंड', 'घरबसल्या काम', 'दररोज पैसे कमवा',
  'कॅशबॅक', 'नफा',
  // Hindi
  'लॉटरी जीती', 'इनाम', 'रिफंड प्राप्त करें', 'घर बैठे कमाएं', 'कैशबैक',
  'रोजाना कमाएं', 'मुनाफा'
];

const IMPERSONATION_TARGETS = [
  'sbi', 'state bank of india', 'hdfc', 'icici', 'axis bank', 'punjab national bank',
  'paytm', 'phonepe', 'google pay', 'gpay', 'electricity board', 'mahavitaran',
  'bses', 'tata power', 'income tax', 'cbi', 'police', 'customs', 'amazon delivery',
  'fedex courier', 'bluedart'
];

function extractUrlsFromText(text) {
  const urlRegex = /(https?:\/\/[^\s]+|bit\.ly\/[^\s]+|tinyurl\.com\/[^\s]+|cutt\.ly\/[^\s]+)/gi;
  return text.match(urlRegex) || [];
}

function analyzeMessage(rawText) {
  if (!rawText || !rawText.trim()) {
    return {
      riskLevel: 'LOW',
      riskScore: 0,
      decision: 'ALLOW',
      status: 'EMPTY',
      reasons: ['No message content provided for evaluation.'],
      indicators: [],
      recommendation: 'Enter message text to initiate contextual fraud analysis.'
    };
  }

  const text = rawText.toLowerCase();
  const indicators = [];
  const reasons = [];
  let score = 5;

  // 1. Detect Urgency / Coercion Tactics
  const matchedUrgency = URGENCY_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
  if (matchedUrgency.length > 0) {
    const weight = Math.min(35, matchedUrgency.length * 15);
    score += weight;
    indicators.push({
      id: 'artificial_urgency',
      title: 'Artificial Time Pressure / Coercion',
      severity: 'HIGH',
      weight,
      description: `Detected pressure phrases: "${matchedUrgency.slice(0, 3).join('", "')}"`
    });
    reasons.push('Uses psychological time pressure to induce panic and bypass logical decision-making.');
  }

  // 2. Detect OTP / Credential Harvesting Intent
  const matchedCredentials = OTP_CREDENTIAL_TRIGGERS.filter(trigger => text.includes(trigger.toLowerCase()));
  if (matchedCredentials.length > 0) {
    const weight = Math.min(45, matchedCredentials.length * 25);
    score += weight;
    indicators.push({
      id: 'credential_harvesting_intent',
      title: 'Explicit Request for OTP / Sensitive Credentials',
      severity: 'CRITICAL',
      weight,
      description: `Triggers detected: "${matchedCredentials.slice(0, 2).join('", "')}"`
    });
    reasons.push('Directly solicits one-time passwords (OTP), banking credentials, or Aadhaar/PAN modifications.');
  }

  // 3. Detect Financial / Prize / Job Baiting
  const matchedInducements = FINANCIAL_INDUCEMENTS.filter(trigger => text.includes(trigger.toLowerCase()));
  if (matchedInducements.length > 0) {
    const weight = Math.min(35, matchedInducements.length * 15);
    score += weight;
    indicators.push({
      id: 'financial_baiting',
      title: 'Unrealistic Financial Inducement / Prize Baiting',
      severity: 'HIGH',
      weight,
      description: `Bait phrases detected: "${matchedInducements.slice(0, 2).join('", "')}"`
    });
    reasons.push('Promises unverified refunds, lottery winnings, or lucrative remote part-time compensation.');
  }

  // 4. Detect Brand / Institutional Impersonation
  const matchedImpersonations = IMPERSONATION_TARGETS.filter(target => text.includes(target));
  if (matchedImpersonations.length > 0) {
    const weight = 20;
    score += weight;
    indicators.push({
      id: 'institutional_impersonation',
      title: 'Institutional Authority Impersonation',
      severity: 'MEDIUM',
      weight,
      description: `Mentions trusted entity: "${matchedImpersonations.join(', ')}"`
    });
    reasons.push(`Claims representation of a trusted entity (${matchedImpersonations[0].toUpperCase()}) without authenticated verification.`);
  }

  // 5. Embedded URL Inspection
  const urls = extractUrlsFromText(rawText);
  let urlAnalysisResult = null;
  if (urls.length > 0) {
    score += 20;
    // Analyze primary link
    urlAnalysisResult = analyzeUrl(urls[0]);
    indicators.push({
      id: 'embedded_url_present',
      title: `Embedded Action Link (${urls[0]})`,
      severity: urlAnalysisResult.riskLevel === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      weight: urlAnalysisResult.riskScore > 50 ? 35 : 15,
      description: `Target domain: ${urlAnalysisResult.hostname || urls[0]} | Risk: ${urlAnalysisResult.riskLevel}`
    });
    if (urlAnalysisResult.riskLevel === 'CRITICAL' || urlAnalysisResult.riskLevel === 'HIGH') {
      score += 30;
      reasons.push(`Embedded link (${urlAnalysisResult.hostname}) flagged as malicious by PhishNet threat engine.`);
    }
  }

  const normalizedScore = Math.min(100, Math.max(5, score));

  let riskLevel = 'LOW';
  let decision = 'ALLOW';
  let status = 'LEGITIMATE';

  if (normalizedScore >= 75) {
    riskLevel = 'CRITICAL';
    decision = 'BLOCK';
    status = 'HIGH_RISK_SCAM';
  } else if (normalizedScore >= 50) {
    riskLevel = 'HIGH';
    decision = 'QUARANTINE';
    status = 'SUSPICIOUS';
  } else if (normalizedScore >= 25) {
    riskLevel = 'MEDIUM';
    decision = 'WARN';
    status = 'SUSPICIOUS';
  }

  let recommendation = 'Standard communication. No malicious social engineering signatures detected.';
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    recommendation = 'DO NOT reply, DO NOT click any links, and NEVER share OTP or banking details. Report the sender to 1930.';
  } else if (riskLevel === 'MEDIUM') {
    recommendation = 'Exercise caution. Independently confirm sender identity through official channels before acting.';
  }

  return {
    originalText: rawText,
    detectedLanguage: /[\u0900-\u097F]/.test(rawText) ? 'indic' : 'en',
    riskLevel,
    riskScore: normalizedScore,
    decision,
    status,
    embeddedUrls: urls,
    urlAnalysis: urlAnalysisResult,
    indicators,
    reasons: reasons.length > 0 ? reasons : ['Message content demonstrates normal conversational or transactional patterns.'],
    recommendation
  };
}

module.exports = {
  analyzeMessage
};
