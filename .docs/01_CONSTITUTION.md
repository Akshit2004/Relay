# Project Relay: Constitution

## 1. Product Vision & Aesthetics
- **Vision:** Build the easiest infrastructure API for developers. Be the "Stripe for communications."
- **Design Taste (anti-ai-slop-uiux):** 
  - Interfaces MUST be premium, feeling highly polished.
  - **Dark-mode first:** Rely on rich dark hues, sleek contrasts, and minimal distractions.
  - Avoid generic primary colors. Use curated HSL palettes.
  - Embrace micro-interactions (e.g., hover effects, transitions) for a dynamic UI.
  - No unnecessary UI elements. Speed and developer focus are paramount.

## 2. Code Quality & Standards
- **Strict Typing:** All code must be strongly typed using TypeScript. `any` is forbidden unless interacting with a completely untyped third-party library.
- **Error Handling:** Predictable, consistent error schemas (e.g., standard HTTP codes, JSON error responses).
- **Simplicity:** API endpoints must be simple, intuitive, and RESTful. JSON is the only accepted payload format.

## 3. Performance & Reliability
- **Latency:** Dashboard pages must load in under 500ms.
- **Uptime:** Target an API success rate of >99.9%.
- **Deliverability:** Email delivery rate target >98%.
- **Idempotency:** All state-mutating API requests must support idempotency keys.
- **Tracing:** Every request must generate a unique Request ID for centralized logging and traceability.

## 4. Security & Compliance
- **Transport:** TLS everywhere. No unencrypted traffic.
- **Authentication:** API keys must be securely hashed and encrypted at rest.
- **Integrations:** Webhooks must be signed to prevent spoofing.
- **Access Control:** Implement robust rate limiting and burst protection.
- **Auditability:** Maintain comprehensive audit logs. Build towards SOC 2 readiness and GDPR compliance.

## 5. Documentation
- Documentation is a first-class citizen. It must be exceptional.
- Include quickstarts, copy-paste code snippets, detailed API/Error references, and comprehensive SDK examples.
