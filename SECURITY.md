# Security Policy — RakshakOS

## 1. Project Scope & Innovation Notice
**RakshakOS** is an innovative cybersecurity defense system prototype engineered for **Smart India Hackathon (SIH 2026)** under the **Student Innovation** category. It demonstrates context-aware multimodal intelligence for proactive defense against AI-enabled cyber fraud across mobile operating system and web interaction boundaries.

**Crucial Notice:**
RakshakOS is **not** a standalone operating system kernel; it is a proposed operating-system/device-level defense layer and demonstrator. It does not replace low-level OS kernel security or commercial endpoint protection.

---

## 2. Threat Model & Security Hygiene

RakshakOS is architected with defense-in-depth principles:

### A. Secret Protection
- **Zero Hardcoded Secrets:** No external API keys, tokens, or credentials are stored within the codebase.
- **Environment Isolation:** All external threat intelligence providers (VirusTotal, Google Safe Browsing, urlscan.io, Groq) are loaded exclusively via environment variables (`.env`).
- **Safe Fallback:** In the absence of external keys, the system gracefully utilizes local machine learning models and deterministic heuristic analysis adapters without degradation or false assertions.

### B. Input Validation & Sanitization
- All incoming URLs, message texts, email headers, call transcripts, and scenarios undergo strict sanitization before regex parsing or lexical feature extraction.
- Cross-Site Scripting (XSS) protections are enforced across all dynamic report generations and DOM rendering.
- No arbitrary remote code execution or client shell interaction is permitted.

### C. Data Privacy & Minimization
- **No Unsolicited Telemetry:** User inputs are processed in-memory. No private credentials, phone call recordings, or user SMS databases are collected or stored remotely.
- **Local Storage Isolation:** Incident reports and personal safety logs reside exclusively in browser client-side storage (`localStorage`) unless explicitly exported by the user.
- **No Deceptive Forensics:** Deepfake and voice scam modules transparently demarcate supported contextual feature analysis from research scenario simulations.

---

## 3. Reporting a Security Vulnerability

If you discover a potential vulnerability within the RakshakOS prototype, please report it responsibly:
- **Contact:** Open a private security advisory on the GitHub repository or contact the research team at `nalagetejas2196@gmail.com`.
- **Response Timeline:** We aim to review and acknowledge all reports within 48 hours and release patches within 7 business days.
