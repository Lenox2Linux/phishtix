import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { initialTickets } from "@/data/tickets";
import { Note, Ticket } from "@/types/ticket";

type AppContextValue = {
  isAuthenticated: boolean;
  login: () => void;
  user: {
    email: string;
    name: string;
  };
  tickets: Ticket[];
  createFromTemplate: () => Ticket;
};

const AppContext = createContext<AppContextValue | null>(null);

const templateNote: Note = {
  author: "Avery Chen",
  timestamp: "Now",
  type: "Finding",
  body: "New mobile-created ticket seeded from local template data pending API-backed intake."
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const value = useMemo<AppContextValue>(
    () => ({
      isAuthenticated,
      login: () => setIsAuthenticated(true),
      user: {
        email: "analyst@phishtix.local",
        name: "Avery Chen"
      },
      tickets,
      createFromTemplate: () => {
        const nextIdNumber =
          tickets.reduce((highest, ticket) => {
            const numericId = Number(ticket.id.replace("PTX-", ""));
            return Number.isNaN(numericId) ? highest : Math.max(highest, numericId);
          }, 4000) + 1;
        const ticket: Ticket = {
          id: `PTX-${nextIdNumber}`,
          title: "Suspicious Microsoft 365 credential lure",
          summary: "User reported a payroll-themed email with urgent language and a fake sign-in experience.",
          status: "In Review",
          priority: "High",
          sourceType: "Email",
          threatLabel: "Likely Phishing",
          riskScore: 76,
          reporter: "New Intake",
          assignee: "Avery Chen",
          channel: "Email",
          createdAt: "Mar 12, 2026 10:30",
          aiSummary: "Likely phishing message using payroll urgency and a credential collection pretext.",
          plainExplanation: "This mock intake looks suspicious because it uses urgency and asks the user to interact with a sign-in themed lure outside trusted channels.",
          findings: [
            "Urgent payroll language is being used as the social engineering hook.",
            "Destination and sender are not trusted yet.",
            "Message should be reviewed before any user interaction continues."
          ],
          indicators: [
            {
              type: "Sender",
              value: "finance@external-mail.co",
              note: "External sender using a financial pretext."
            },
            {
              type: "Keyword",
              value: "payroll adjustment",
              note: "Urgency and compensation topic used as lure."
            }
          ],
          evidence: [
            {
              label: "Source Type",
              value: "Email",
              detail: "User-submitted intake pending deeper validation."
            },
            {
              label: "Initial Assessment",
              value: "Suspicious",
              detail: "Created from mobile prototype intake template."
            }
          ],
          recommendedActions: [
            "Do not reply or interact with the message.",
            "Preserve screenshots and original message content.",
            "Escalate to analyst review for final classification."
          ],
          guidedQuestions: [
            {
              prompt: "What urgency language is being used to push the user into acting quickly?",
              hint: "Look at payroll and account-action wording."
            }
          ],
          notes: [templateNote],
          workflow: [
            {
              name: "Collection",
              state: "In Progress",
              owner: "SOC Triage",
              description: "Acquiring original email, report details, and redirect evidence."
            },
            {
              name: "Analysis",
              state: "Queued",
              owner: "Email Security",
              description: "Reputation and infrastructure analysis will start after collection is complete."
            },
            {
              name: "Containment",
              state: "Queued",
              owner: "Mail Operations",
              description: "Containment actions will be selected based on mailbox scope and delivered volume."
            },
            {
              name: "Reporting",
              state: "Queued",
              owner: "Incident Lead",
              description: "Report summary will be drafted once scope and impact are confirmed."
            }
          ],
          timeline: [
            {
              time: "10:30",
              title: "Ticket created from mobile intake",
              detail: "Mock create-ticket flow added a seeded record to local state."
            }
          ]
        };

        setTickets((current) => [ticket, ...current]);
        return ticket;
      }
    }),
    [isAuthenticated, tickets]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}

export function useTicketsStore() {
  return useAppContext();
}
