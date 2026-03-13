export type WorkflowState = "Done" | "In Progress" | "Queued";
export type TicketPriority = "Critical" | "High" | "Medium";
export type SourceType = "Email" | "SMS" | "Social" | "Website";
export type ThreatLabel = "Likely Phishing" | "Credential Harvest" | "BEC Attempt" | "Suspicious Link";

export type TimelineEntry = {
  time: string;
  title: string;
  detail: string;
};

export type Note = {
  author: string;
  timestamp: string;
  type: "Finding" | "Action" | "Observation";
  body: string;
};

export type WorkflowStep = {
  name: string;
  state: WorkflowState;
  owner: string;
  description: string;
};

export type Indicator = {
  type: "URL" | "Domain" | "Sender" | "Attachment" | "Phone" | "Keyword";
  value: string;
  note: string;
};

export type EvidenceItem = {
  label: string;
  value: string;
  detail: string;
};

export type GuidedQuestion = {
  prompt: string;
  hint: string;
};

export type Ticket = {
  id: string;
  title: string;
  summary: string;
  status: "In Review" | "Containment" | "Monitoring" | "Escalated";
  priority: TicketPriority;
  sourceType: SourceType;
  threatLabel: ThreatLabel;
  riskScore: number;
  reporter: string;
  assignee: string;
  channel: string;
  createdAt: string;
  aiSummary: string;
  plainExplanation: string;
  findings: string[];
  indicators: Indicator[];
  evidence: EvidenceItem[];
  recommendedActions: string[];
  guidedQuestions: GuidedQuestion[];
  notes: Note[];
  workflow: WorkflowStep[];
  timeline: TimelineEntry[];
};
