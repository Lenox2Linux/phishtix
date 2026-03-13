import { Ticket } from "@/types/ticket";

export function buildTicketMarkdown(ticket: Ticket) {
  const indicators = ticket.indicators
    .map((indicator) => `- **${indicator.type}:** ${indicator.value} - ${indicator.note}`)
    .join("\n");

  const findings = ticket.findings.map((finding) => `- ${finding}`).join("\n");
  const actions = ticket.recommendedActions.map((action) => `- ${action}`).join("\n");
  const notes = ticket.notes.map((note) => `- **${note.author} (${note.timestamp})** ${note.body}`).join("\n");

  return `# ${ticket.title}

## Summary
${ticket.summary}

## Risk Score
${ticket.riskScore}/100

## Threat Label
${ticket.threatLabel}

## Indicators
${indicators}

## Findings
${findings}

## Notes
${notes}

## Recommended Actions
${actions}
`;
}
