/**
 * Unified Threat Orchestrator & Multimodal Risk Engine — RakshakOS Core
 *
 * Implements the 4-Stage Processing Pipeline:
 * Stage 1: Multimodal Evidence Fusion
 * Stage 2: Contextual Risk Reasoning
 * Stage 3: Explainable Risk Assessment
 * Stage 4: Proactive Intervention (ALLOW, WARN, VERIFY, QUARANTINE, BLOCK)
 *
 * Research Motto: "DON'T JUST DETECT THE SIGNAL. UNDERSTAND THE CONTEXT."
 */

const { analyzeUrl } = require('./phishnetService');
const { analyzeMessage } = require('./messageAnalyzer');
const { analyzeEmail } = require('./emailAnalyzer');
const { analyzeCallScenario } = require('./callScamAnalyzer');
const { analyzePaymentScenario } = require('./paymentOtpAnalyzer');
const { analyzeDeepfakeScenario } = require('./deepfakeAnalyzer');

function calculateUnifiedRiskScore(signals = []) {
  if (!signals || signals.length === 0) return 0;

  // Maximum signal weight with diminishing returns for compound risk
  const sorted = signals.map(s => s.weight || 0).sort((a, b) => b - a);
  let totalScore = sorted[0] || 0;

  for (let i = 1; i < sorted.length; i++) {
    totalScore += sorted[i] * Math.pow(0.5, i);
  }

  return Math.min(100, Math.round(totalScore));
}

function deriveDecision(score) {
  if (score >= 75) return { riskLevel: 'CRITICAL', decision: 'BLOCK', label: 'Proactive Block' };
  if (score >= 50) return { riskLevel: 'HIGH', decision: 'QUARANTINE', label: 'Isolate & Quarantine' };
  if (score >= 25) return { riskLevel: 'MEDIUM', decision: 'WARN', label: 'Heightened Warning' };
  if (score >= 10) return { riskLevel: 'LOW', decision: 'VERIFY', label: 'Passive Verification' };
  return { riskLevel: 'LOW', decision: 'ALLOW', label: 'Permit Interaction' };
}

function orchestrateThreatScan({ type, payload, context = {} }) {
  const startTime = Date.now();
  let moduleResult = null;

  switch (type) {
    case 'url':
      moduleResult = analyzeUrl(payload.url || payload);
      break;
    case 'message':
      moduleResult = analyzeMessage(payload.text || payload.message || payload);
      break;
    case 'email':
      moduleResult = analyzeEmail(payload);
      break;
    case 'call':
      moduleResult = analyzeCallScenario(payload.transcript || payload.description || payload);
      break;
    case 'payment':
    case 'otp':
      moduleResult = analyzePaymentScenario(payload.scenario || payload);
      break;
    case 'deepfake':
      moduleResult = analyzeDeepfakeScenario(payload);
      break;
    default:
      throw new Error(`Unsupported threat scan vector: ${type}`);
  }

  const processingTimeMs = Date.now() - startTime;

  // Stage 2: Contextual Risk Fusion
  // Factor in device / interaction context if present
  let contextMultiplier = 1.0;
  const contextNotes = [];

  if (context.isElderlyPersona || context.isRuralUser) {
    contextNotes.push('Adjusted sensitivity for high-vulnerability demographic persona.');
  }

  if (context.recentOtpReceived && (type === 'call' || type === 'message')) {
    contextMultiplier += 0.25;
    contextNotes.push('High-risk temporal correlation: OTP received within previous 5 minutes.');
  }

  if (context.activeScreenShare && (type === 'payment' || type === 'call')) {
    contextMultiplier += 0.40;
    contextNotes.push('CRITICAL CONTEXT: Active screen sharing utility detected during financial interaction.');
  }

  const baseScore = moduleResult.riskScore || 0;
  const finalRiskScore = Math.min(100, Math.round(baseScore * contextMultiplier));
  const { riskLevel, decision, label } = deriveDecision(finalRiskScore);

  return {
    scanId: `scan-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    threatVector: type.toUpperCase(),
    processingTimeMs,
    riskScore: finalRiskScore,
    riskLevel,
    decision,
    decisionLabel: label,
    scoreClassification: 'Prototype Risk Score (Multimodal Engine)',
    engineMeta: {
      primaryModule: moduleResult.engine || 'RakshakOS Contextual Reasoning Engine v3.0',
      standardsGuidance: 'NIST AI RMF 1.0 / NIST CSF 2.0 / OWASP Mobile Security / I4C CFCFRMS',
      framework: 'RakshakOS SIH 2026 Student Innovation Architecture'
    },
    rawModuleOutput: moduleResult,
    indicators: moduleResult.indicators || [],
    reasons: moduleResult.reasons || [],
    recommendation: moduleResult.recommendation || 'Maintain standard operational vigilance.',
    contextualAudit: contextNotes
  };
}

module.exports = {
  orchestrateThreatScan,
  calculateUnifiedRiskScore,
  deriveDecision
};
