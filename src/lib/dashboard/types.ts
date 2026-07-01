/** Shared dashboard type definitions. */

export interface LogEntry {
  id: string;
  to: string;
  subject: string;
  status: "delivered" | "bounced" | "failed";
  latencyMs: number;
  timestamp: string;
  provider: string;
  response: Record<string, unknown>;
}

export interface RecentActivity {
  id: string;
  to: string;
  subject: string;
  status: "delivered" | "bounced" | "failed";
  time: string;
}

export interface TemplateSummary {
  id: string;
  name: string;
  subject: string;
  updatedAt: string;
  version: number;
  source: string;
  sampleVariables: Record<string, string>;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: "active" | "disabled";
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  event: string;
  endpointUrl: string;
  status: "delivered" | "failed";
  attempt: number;
  timestamp: string;
}
