# Project Relay: Task Breakdown

## Phase 1: Foundation & Authentication
- [ ] Initialize Next.js project with Tailwind CSS.
- [ ] Set up Hono backend repository.
- [ ] Configure Docker and Docker Compose for local MongoDB and Redis.
- [ ] Setup Mongoose and define initial schemas (Users, Teams, API Keys).
- [ ] Implement Authentication (Email, GitHub, Google) using NextAuth or custom JWT strategy.
- [ ] Create basic dashboard layout (Sidebar, Header, Dark Mode toggle).

## Phase 2: Core Email Configuration & Sending API
- [ ] Implement Email Configuration UI (Link custom SMTP credentials or choose default platform email).
- [ ] Implement secure storage for SMTP credentials in the backend.
- [ ] Define `POST /emails` API endpoint in Hono.
- [ ] Implement API Key validation middleware.
- [ ] Setup Redis job queue (e.g., BullMQ) for processing email sending asynchronously.
- [ ] Integrate a mock/test SMTP provider for local testing.

## Phase 3: Templates, Logs, & Analytics
- [ ] Create Database schemas for Templates and Logs.
- [ ] Build Template Editor UI (HTML/Text preview, variables).
- [ ] Implement variable interpolation engine in the backend.
- [ ] Build Logs viewer UI in Dashboard (List views, detailed modal).
- [ ] Create Analytics Dashboard UI (Charts for sent, delivered, bounced metrics).

## Phase 4: Webhooks & Initial SDKs
- [ ] Implement Webhook Endpoint registration UI.
- [ ] Create webhook dispatcher worker (signing payloads, exponential backoff retries).
- [ ] Write tests to ensure webhooks trigger on email delivery/bounce.
- [ ] Scaffold Node.js/TypeScript SDK `relay-node`.
- [ ] Publish SDK documentation (Quickstart, API reference).
