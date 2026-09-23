/**
 * Email Fraud & Phishing Analyzer — RakshakOS Multimodal Threat Engine
 *
 * Scans email header metadata (sender mismatch, free mail domain masquerade),
 * subject line manipulation, credential harvesting intent, and malicious links.
 */

const { analyzeUrl } = require('./phishnetService');

const FREE_EMAIL_PROVIDERS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'rediffmail.com', 'proton.me'];
const ENTERPRISE_BRANDS = ['sbi', 'hdfc', 'icici', 'axis', 'paypal', 'microsoft', 'google', 'apple', 'amazon', 'netflix'];

function analyzeEmail({ sender, subject, body, links = [] }) {
  const indicators = [];
  const reasons = [];
  let score = 5;

  const senderClean = (sender || '').trim().toLowerCase();
  const subjectClean = (subject || '').trim().toLowerCase();
  const bodyClean = (body || '').trim().toLowerCase();

  // 1. Sender Spoofing & Domain Mismatch
  if (senderClean) {
    const emailMatch = senderClean.match(/<([^>]+)>/) || senderClean.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const actualEmail = emailMatch ? emailMatch[1].toLowerCase() : senderClean;
    const domain = actualEmail.includes('@') ? actualEmail.split('@')[1] : '';

    // Check if display name claims an enterprise brand but uses free or mismatched provider
    for (const brand of ENTERPRISE_BRANDS) {
      if (senderClean.includes(brand) && FREE_EMAIL_PROVIDERS.includes(domain)) {
        score += 45;
        indicators.push({
          id: 'free_provider_brand_spoof',
          title: `Brand Impersonation via Public Mailbox (${brand.toUpperCase()})`,
          severity: 'CRITICAL',
          weight: 45,
          description: `Sender claims to be "${brand.toUpperCase()}" but operates from free provider: ${domain}`
        });
        reasons.push(`Official organizations do not communicate customer security alerts from public free domains (${domain}).`);
        break;
      }
    }

    // Check if domain resembles brand typosquat
    if (domain) {
      for (const brand of ENTERPRISE_BRANDS) {
        if (domain.includes(brand) && !domain.endsWith(`${brand}.com`) && !domain.endsWith(`${brand}.co.in`)) {
          score += 35;
          indicators.push({
            id: 'lookalike_sender_domain',
            title: `Lookalike Sender Domain (${domain})`,
            severity: 'HIGH',
            weight: 35,
            description: `Sender domain contains brand keyword "${brand}" on an unauthorized host.`
          });
          reasons.push(`The sender domain (${domain}) mimics authentic brand infrastructure.`);
          break;
        }
      }
    }
  }

  // 2. Subject Line Analysis (Urgency & Threat Coercion)
  const urgentSubjectPatterns = ['urgent', 'action required', 'immediate', 'suspended', 'invoice overdue', 'payroll update', 'salary revision', 'account locked', 'unauthorized access'];
  const matchedSubject = urgentSubjectPatterns.filter(p => subjectClean.includes(p));
  if (matchedSubject.length > 0) {
    score += 25;
    indicators.push({
      id: 'subject_coercion',
      title: 'High-Urgency Subject Vector',
      severity: 'HIGH',
      weight: 25,
      description: `Subject induces panic/curiosity: "${matchedSubject.join(', ')}"`
    });
    reasons.push('Uses urgent subject framing to pressure the recipient into hasty interaction.');
  }

  // 3. Body Text Analysis (Sensitive Requests & Call to Action)
  const bodyThreatPatterns = [
    { pattern: 'verify your account', weight: 20, desc: 'Prompts immediate credential re-authentication' },
    { pattern: 'click here to update', weight: 25, desc: 'Forces external link interaction for compliance' },
    { pattern: 'gift card', weight: 30, desc: 'Unusual gift-card or cryptocurrency payment solicitation' },
    { pattern: 'wire transfer', weight: 35, desc: 'Out-of-band wire transfer or bank account modification' },
    { pattern: 'password will expire', weight: 20, desc: 'Deceptive credential expiry pretext' },
    { pattern: 'attach payment receipt', weight: 15, desc: 'Social engineering invoice verification trap' }
  ];

  for (const item of bodyThreatPatterns) {
    if (bodyClean.includes(item.pattern)) {
      score += item.weight;
      indicators.push({
        id: `body_${item.pattern.replace(/\s+/g, '_')}`,
        title: `Phishing Pretext: "${item.pattern}"`,
        severity: item.weight > 25 ? 'HIGH' : 'MEDIUM',
        weight: item.weight,
        description: item.desc
      });
      reasons.push(item.desc);
    }
  }

  // 4. Embedded URL Extraction & Inspection
  const urlRegex = /(https?:\/\/[^\s"'<>]+)/gi;
  const extractedLinks = [...(bodyClean.match(urlRegex) || []), ...(Array.isArray(links) ? links : [])];
  let primaryLinkAnalysis = null;

  if (extractedLinks.length > 0) {
    primaryLinkAnalysis = analyzeUrl(extractedLinks[0]);
    if (primaryLinkAnalysis.riskLevel === 'CRITICAL' || primaryLinkAnalysis.riskLevel === 'HIGH') {
      score += 40;
      indicators.push({
        id: 'email_malicious_link',
        title: `Malicious Call-To-Action Link (${primaryLinkAnalysis.hostname})`,
        severity: 'CRITICAL',
        weight: 40,
        description: `Embedded link resolves to flagged phishing domain: ${primaryLinkAnalysis.hostname}`
      });
      reasons.push(`Embedded hyperlink points to an untrusted or typosquatted domain (${primaryLinkAnalysis.hostname}).`);
    }
  }

  const normalizedScore = Math.min(100, Math.max(5, score));

  let riskLevel = 'LOW';
  let decision = 'ALLOW';
  let status = 'LEGITIMATE';

  if (normalizedScore >= 75) {
    riskLevel = 'CRITICAL';
    decision = 'BLOCK';
    status = 'PHISHING_CAMPAIGN';
  } else if (normalizedScore >= 50) {
    riskLevel = 'HIGH';
    decision = 'QUARANTINE';
    status = 'SUSPICIOUS';
  } else if (normalizedScore >= 25) {
    riskLevel = 'MEDIUM';
    decision = 'WARN';
    status = 'SUSPICIOUS';
  }

  let recommendation = 'Standard email correspondence. No deceptive header or link indicators detected.';
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    recommendation = 'DO NOT click links, download attachments, or reply. Mark as Phishing and report to internal IT/1930.';
  } else if (riskLevel === 'MEDIUM') {
    recommendation = 'Verify the sender email domain directly against official company contact lists before responding.';
  }

  return {
    sender,
    subject,
    riskLevel,
    riskScore: normalizedScore,
    decision,
    status,
    linkAnalysis: primaryLinkAnalysis,
    indicators,
    reasons: reasons.length > 0 ? reasons : ['No deceptive sender headers or suspicious credential prompts detected.'],
    recommendation
  };
}

module.exports = {
  analyzeEmail
};
