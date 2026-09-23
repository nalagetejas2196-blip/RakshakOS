/**
 * Scam Call / Vishing Scenario Analyzer — RakshakOS Multimodal Threat Engine
 *
 * Evaluates reported call transcripts or user scenario descriptions for
 * high-impact voice fraud vectors: digital arrest, police/CBI impersonation,
 * remote desktop app coercion (AnyDesk, TeamViewer), OTP extortion, and urgency.
 */

const VISHING_PATTERNS = [
  {
    id: 'digital_arrest_coercion',
    category: 'Authority Intimidation',
    keywords: ['cbi', 'police', 'customs', 'narcotics', 'ncb', 'cyber crime branch', 'arrest warrant', 'digital arrest', 'money laundering', 'aadhaar linked to drugs', 'sim card banned'],
    weight: 50,
    severity: 'CRITICAL',
    title: 'Fabricated Law Enforcement / Digital Arrest Coercion',
    description: 'Impersonates police, CBI, or customs officials claiming impending arrest or money laundering.'
  },
  {
    id: 'remote_access_software',
    category: 'Device Compromise',
    keywords: ['anydesk', 'teamviewer', 'rustdesk', 'quicksupport', 'screen share', 'download app', 'apk', 'install support tool'],
    weight: 45,
    severity: 'CRITICAL',
    title: 'Remote Device Control Solicitation',
    description: 'Instructs victim to install remote desktop tools (AnyDesk, TeamViewer) granting full phone/PC takeover.'
  },
  {
    id: 'live_otp_demand',
    category: 'Credential Extortion',
    keywords: ['share otp', 'tell the otp', 'read 6 digit code', 'verification code', 'press 1', 'pin'],
    weight: 40,
    severity: 'CRITICAL',
    title: 'Coerced Live OTP / PIN Disclosure',
    description: 'Caller demands immediate readout of two-factor authentication tokens while keeping user engaged.'
  },
  {
    id: 'banking_account_threat',
    category: 'Financial Panic',
    keywords: ['account blocked', 'debit card blocked', 'rbi guideline', 'freeze account', 'kyc expired', 'electricity cut', 'power disconnection'],
    weight: 35,
    severity: 'HIGH',
    title: 'Imminent Service / Account Suspension Threat',
    description: 'Creates artificial panic regarding frozen bank accounts or severed electricity service.'
  },
  {
    id: 'secret_transfer_demand',
    category: 'Financial Siphoning',
    keywords: ['security deposit', 'transfer to safe account', 'verify funds', 'rbi verification account', 'pay fee to clear charges'],
    weight: 45,
    severity: 'CRITICAL',
    title: 'Coerced "Safe Account" Fund Transfer',
    description: 'Demands fund transfer to a temporary "clearance" or "RBI security" account.'
  },
  {
    id: 'isolation_tactic',
    category: 'Psychological Control',
    keywords: ['do not disconnect', 'stay on call', 'do not tell anyone', 'confidential investigation', 'remain in closed room', 'turn on video'],
    weight: 30,
    severity: 'HIGH',
    title: 'Victim Isolation & Surveillance Directive',
    description: 'Forbids the victim from hanging up, speaking to family, or seeking outside assistance.'
  }
];

function analyzeCallScenario(transcriptOrDescription) {
  if (!transcriptOrDescription || !transcriptOrDescription.trim()) {
    return {
      riskLevel: 'LOW',
      riskScore: 0,
      decision: 'ALLOW',
      status: 'EMPTY',
      reasons: ['No call transcript or description provided for analysis.'],
      indicators: [],
      timeline: [],
      recommendation: 'Describe the call conversation or paste transcript to evaluate vishing risks.'
    };
  }

  const text = transcriptOrDescription.toLowerCase();
  const indicators = [];
  const reasons = [];
  const timeline = [];
  let score = 5;

  let stepIndex = 1;

  for (const pattern of VISHING_PATTERNS) {
    const matched = pattern.keywords.filter(kw => text.includes(kw));
    if (matched.length > 0) {
      score += pattern.weight;
      indicators.push({
        id: pattern.id,
        category: pattern.category,
        title: pattern.title,
        severity: pattern.severity,
        weight: pattern.weight,
        matchedTokens: matched,
        description: pattern.description
      });
      reasons.push(pattern.description);

      timeline.push({
        step: stepIndex++,
        stage: pattern.category,
        detectedTrigger: matched.join(', '),
        riskSeverity: pattern.severity,
        explanation: pattern.title
      });
    }
  }

  const normalizedScore = Math.min(100, Math.max(5, score));

  let riskLevel = 'LOW';
  let decision = 'ALLOW';
  let status = 'SAFE_CALL';

  if (normalizedScore >= 75) {
    riskLevel = 'CRITICAL';
    decision = 'BLOCK';
    status = 'ACTIVE_VISHING_FRAUD';
  } else if (normalizedScore >= 45) {
    riskLevel = 'HIGH';
    decision = 'QUARANTINE';
    status = 'HIGH_PROBABILITY_SCAM';
  } else if (normalizedScore >= 20) {
    riskLevel = 'MEDIUM';
    decision = 'WARN';
    status = 'SUSPICIOUS_CALL';
  }

  let recommendation = 'No classic social engineering or vishing signatures detected.';
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    recommendation = 'DISCONNECT IMMEDIATELY. Law enforcement never executes "digital arrests" via video/audio calls. Never install AnyDesk or share OTPs. Dial 1930.';
  } else if (riskLevel === 'MEDIUM') {
    recommendation = 'Hang up and call the organization back using the verified customer service number on their official website.';
  }

  return {
    inputDescription: transcriptOrDescription,
    riskLevel,
    riskScore: normalizedScore,
    decision,
    status,
    indicators,
    timeline,
    reasons: reasons.length > 0 ? reasons : ['Conversation does not exhibit coercive social engineering patterns.'],
    recommendation
  };
}

module.exports = {
  analyzeCallScenario
};
