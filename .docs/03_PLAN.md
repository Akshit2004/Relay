# Project Relay: Technical Plan

## 1. Overview
The architecture is designed to be highly reliable, easily scalable, and capable of processing high-throughput background tasks (email sending, webhooks, analytics).

## 2. Tech Stack

### Frontend
- **Framework:** Next.js (App Router) for hybrid static & server rendering.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS combined with Vanilla CSS where granular control is needed. Focus on premium dark-mode aesthetics.
- **State/Data Fetching:** React Server Components (RSC) and SWR / React Query for client-side dynamic data.

### Backend (API & Workers)
- **Framework:** Hono (Node.js runtime). Chosen for its minimal overhead, blazing fast routing, and edge compatibility.
- **Language:** TypeScript.
- **Database:** MongoDB.
- **ODM:** Mongoose for structured document schemas and interactions.
- **Queue/Cache:** Redis. Used for rate limiting, burst protection, and managing background jobs (email dispatching, webhook retries).

### Infrastructure
- **Containerization:** Docker for local development and unified deployment.
- **File Storage:** S3-compatible Object Storage for email attachments and static assets.
- **Orchestration:** Kubernetes (planned for future scale, initially deployable via Docker Compose/managed containers).
- **Logging/Monitoring:** Centralized structured logging.

## 3. Data Architecture (Key Entities)
- **User:** Authentication and profile info.
- **Team:** For grouping users and managing billing/access.
- **SenderConfig:** Stores custom SMTP credentials or flags usage of the default platform email.
- **API Key:** Hashed secret keys bound to a Team or Project.
- **Template:** Versioned HTML/Text email templates.
- **Log:** Immutable records of all outgoing messages, linked to Request IDs.
- **Webhook Endpoint:** Registered URLs to receive event payloads.

## 4. Workflows

### Sending an Email
1. Client calls `POST /emails` with an API Key.
2. API validates the key, checks rate limits (Redis), and validates the payload.
3. If using a template, variable interpolation occurs.
4. The API saves a pending `Log` entry, generates a `Request ID`, pushes a job to the Redis queue, and immediately returns `202 Accepted` to the client.
5. The background worker picks up the job, dispatches the email via SMTP/Provider, and updates the `Log` status.
6. The background worker pushes an event to the Webhook queue if necessary.

### Webhook Dispatch
1. Event occurs (e.g., email delivered).
2. Worker queries registered webhook endpoints for the account.
3. Payload is signed with a secret.
4. HTTP POST is made. If it fails, exponential backoff retries are queued in Redis.
