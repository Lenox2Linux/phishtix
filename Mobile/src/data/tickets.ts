import { Ticket } from "@/types/ticket";

export const initialTickets: Ticket[] = [
  {
    id: "PTX-4012",
    title: "Microsoft 365 credential harvest campaign",
    summary: "Multiple finance users received a payroll adjustment lure linking to a fake Microsoft 365 sign-in page.",
    status: "In Review",
    priority: "Critical",
    sourceType: "Email",
    threatLabel: "Credential Harvest",
    riskScore: 93,
    reporter: "Kim Tran",
    assignee: "Avery Chen",
    channel: "Email",
    createdAt: "Mar 12, 2026 08:15",
    aiSummary: "High-confidence credential harvest using a spoofed payroll pretext and cloned Microsoft sign-in flow.",
    plainExplanation: "This message tries to pressure users into entering work credentials on a fake Microsoft page. The sender, link path, and page behavior all point to credential theft.",
    findings: [
      "Sender domain was registered recently and does not belong to Microsoft.",
      "Landing page posts credentials to an external PHP endpoint.",
      "Language targets payroll urgency to increase click-through."
    ],
    indicators: [
      {
        type: "Sender",
        value: "payroll-adjustments@micr0soft-verify.com",
        note: "Lookalike domain impersonating Microsoft."
      },
      {
        type: "URL",
        value: "https://m365-payroll-review[.]com/login",
        note: "Credential harvest landing page."
      },
      {
        type: "Keyword",
        value: "Payroll adjustment required today",
        note: "Urgency wording used to pressure targets."
      }
    ],
    evidence: [
      {
        label: "Email Subject",
        value: "Payroll adjustment required today",
        detail: "Urgent compensation pretext targeting finance users."
      },
      {
        label: "Redirect Path",
        value: "URL shortener > fake M365 page > PHP POST endpoint",
        detail: "Classic credential harvest chain."
      },
      {
        label: "User Impact",
        value: "6 reported recipients",
        detail: "Finance mailbox cluster primarily targeted."
      }
    ],
    recommendedActions: [
      "Block the sender domain and final landing page.",
      "Search mailboxes and purge matching messages.",
      "Force reset affected credentials if any users submitted data."
    ],
    guidedQuestions: [
      {
        prompt: "What evidence confirms this is credential theft rather than spam?",
        hint: "Look at the login page behavior and where the submitted data is sent."
      },
      {
        prompt: "Which user population appears to be targeted and why?",
        hint: "Use the subject line and recipient pattern."
      }
    ],
    notes: [
      {
        author: "Avery Chen",
        timestamp: "08:42",
        type: "Finding",
        body: "Landing page cloned Microsoft branding and posted credentials to an external PHP endpoint."
      },
      {
        author: "Morgan Diaz",
        timestamp: "09:05",
        type: "Action",
        body: "Blocked sender domain and submitted target URL to secure web gateway deny list."
      }
    ],
    workflow: [
      {
        name: "Collection",
        state: "Done",
        owner: "SOC Triage",
        description: "Gathered original message, headers, screenshots, and user report context."
      },
      {
        name: "Analysis",
        state: "In Progress",
        owner: "Email Security",
        description: "Confirming whether any submitted credentials were used for follow-on login attempts."
      },
      {
        name: "Containment",
        state: "Queued",
        owner: "Identity Team",
        description: "Prepared forced reset path for impacted users if account use is confirmed."
      },
      {
        name: "Reporting",
        state: "Queued",
        owner: "Incident Lead",
        description: "Customer-facing summary will be drafted after exposure is validated."
      }
    ],
    timeline: [
      {
        time: "08:15",
        title: "Ticket opened",
        detail: "Finance analyst reported suspicious payroll-themed message to phishing mailbox."
      },
      {
        time: "08:33",
        title: "Indicators extracted",
        detail: "Headers, sender infrastructure, and redirect chain were collected for review."
      },
      {
        time: "09:11",
        title: "Gateway block requested",
        detail: "Security tooling update initiated to block repeated delivery attempts."
      }
    ]
  },
  {
    id: "PTX-4011",
    title: "DocuSign impersonation targeting HR",
    summary: "A spoofed DocuSign email attempted to redirect HR staff toward a credential challenge page.",
    status: "Containment",
    priority: "High",
    sourceType: "Email",
    threatLabel: "Likely Phishing",
    riskScore: 84,
    reporter: "Jordan Park",
    assignee: "Taylor Brooks",
    channel: "Email",
    createdAt: "Mar 12, 2026 07:42",
    aiSummary: "Likely phishing email abusing a trusted business workflow brand to steal credentials from HR recipients.",
    plainExplanation: "This looks like a fake DocuSign request. It uses a familiar brand to make the message appear safe, but the sender and redirect behavior do not match legitimate DocuSign traffic.",
    findings: [
      "Sender domain is a lookalike and not associated with DocuSign.",
      "Attachment contains a redirect to a credential prompt.",
      "HR users were specifically targeted with signature-related language."
    ],
    indicators: [
      {
        type: "Sender",
        value: "notifications@docusign-review.co",
        note: "Lookalike sender impersonating DocuSign."
      },
      {
        type: "Attachment",
        value: "review_document.pdf",
        note: "Embedded redirect to phishing site."
      },
      {
        type: "Domain",
        value: "hr-approval-sso[.]com",
        note: "Credential prompt host."
      }
    ],
    evidence: [
      {
        label: "Brand Abuse",
        value: "DocuSign",
        detail: "Trusted business workflow spoofed to improve credibility."
      },
      {
        label: "Target Team",
        value: "HR",
        detail: "Recipients aligned with document signing processes."
      },
      {
        label: "Attachment",
        value: "PDF with redirect",
        detail: "Used as the user interaction lure."
      }
    ],
    recommendedActions: [
      "Purge all copies from HR mailboxes.",
      "Warn recipients not to open the PDF attachment.",
      "Add sender and redirect host to monitoring and blocklists."
    ],
    guidedQuestions: [
      {
        prompt: "Why is brand impersonation effective in phishing campaigns like this?",
        hint: "Consider the user expectation for routine documents."
      },
      {
        prompt: "What makes the attachment suspicious before detonation?",
        hint: "Think about sender trust and action pressure."
      }
    ],
    notes: [
      {
        author: "Taylor Brooks",
        timestamp: "07:58",
        type: "Finding",
        body: "Spoof leveraged a lookalike domain and a PDF attachment with a malicious redirect."
      }
    ],
    workflow: [
      {
        name: "Collection",
        state: "Done",
        owner: "SOC Triage",
        description: "Message and attachment secured in evidence storage."
      },
      {
        name: "Analysis",
        state: "Done",
        owner: "Threat Intel",
        description: "Redirect path linked to a known credential harvesting cluster."
      },
      {
        name: "Containment",
        state: "In Progress",
        owner: "Mail Operations",
        description: "Mailbox search and purge underway for undelivered copies."
      },
      {
        name: "Reporting",
        state: "Queued",
        owner: "Incident Lead",
        description: "Final report will include mailbox purge results and user impact summary."
      }
    ],
    timeline: [
      {
        time: "07:42",
        title: "Ticket opened",
        detail: "HR user escalated suspicious signature request."
      },
      {
        time: "08:09",
        title: "Attachment sandboxed",
        detail: "Attachment detonated in sandbox and redirected through a shortened URL."
      }
    ]
  },
  {
    id: "PTX-4010",
    title: "Payroll phishing text message lure",
    summary: "Employees received an SMS claiming payroll details were incomplete and directing them to a fake portal.",
    status: "Monitoring",
    priority: "High",
    sourceType: "SMS",
    threatLabel: "Likely Phishing",
    riskScore: 79,
    reporter: "Jules Rivera",
    assignee: "Avery Chen",
    channel: "SMS",
    createdAt: "Mar 11, 2026 16:10",
    aiSummary: "Smishing campaign using payroll anxiety and a shortened link to pull users into a fake employee portal.",
    plainExplanation: "This text message is suspicious because it pressures the user to act immediately and uses a shortened link that hides the real destination.",
    findings: [
      "Shortened URL obscures the destination domain.",
      "Payroll pretext targets routine employee concerns.",
      "Message was sent outside normal internal communication channels."
    ],
    indicators: [
      {
        type: "Phone",
        value: "+1 (917) 555-0186",
        note: "Unknown sender with no corporate affiliation."
      },
      {
        type: "URL",
        value: "https://bit.ly/3payrollfix",
        note: "Shortened link masking a fake employee portal."
      },
      {
        type: "Keyword",
        value: "direct deposit suspended",
        note: "Fear-based lure language."
      }
    ],
    evidence: [
      {
        label: "Message Format",
        value: "SMS",
        detail: "No email headers or trusted sender identity available."
      },
      {
        label: "Destination",
        value: "payroll-update-center[.]site",
        detail: "Domain not associated with company payroll systems."
      },
      {
        label: "Target Audience",
        value: "General employees",
        detail: "Broad distribution suggests mass phishing."
      }
    ],
    recommendedActions: [
      "Advise users not to tap the link.",
      "Block the destination domain at network controls where possible.",
      "Share a short awareness notice through internal communications."
    ],
    guidedQuestions: [
      {
        prompt: "Why are shortened URLs especially risky in SMS phishing?",
        hint: "Think about visibility and user ability to preview destinations."
      },
      {
        prompt: "What information would you want to collect from a user who received this text?",
        hint: "Focus on whether they clicked and what they saw."
      }
    ],
    notes: [
      {
        author: "Avery Chen",
        timestamp: "16:38",
        type: "Observation",
        body: "Recipients reported the text through internal awareness channel, but no portal submissions have been confirmed."
      }
    ],
    workflow: [
      {
        name: "Collection",
        state: "Done",
        owner: "SOC Triage",
        description: "Captured screenshots and the shortened URL for review."
      },
      {
        name: "Analysis",
        state: "In Progress",
        owner: "Threat Intel",
        description: "Tracing redirect path and delivery scale."
      },
      {
        name: "Containment",
        state: "Queued",
        owner: "Awareness Team",
        description: "Drafting internal awareness notice if broader targeting is confirmed."
      },
      {
        name: "Reporting",
        state: "Queued",
        owner: "Incident Lead",
        description: "Will summarize impact and user reporting quality."
      }
    ],
    timeline: [
      {
        time: "16:10",
        title: "Ticket opened",
        detail: "Users forwarded payroll-related text message screenshots for analysis."
      }
    ]
  },
  {
    id: "PTX-4008",
    title: "Fake password reset portal",
    summary: "A password reset page imitating the company SSO experience was discovered through a user report.",
    status: "Escalated",
    priority: "Critical",
    sourceType: "Website",
    threatLabel: "Credential Harvest",
    riskScore: 89,
    reporter: "Mina Solis",
    assignee: "Morgan Diaz",
    channel: "Website",
    createdAt: "Mar 10, 2026 13:05",
    aiSummary: "Fraudulent password reset portal imitating internal SSO branding with likely credential collection intent.",
    plainExplanation: "This website is pretending to be a legitimate password reset page. It uses internal branding to gain trust, but the domain and infrastructure do not belong to the company.",
    findings: [
      "Portal uses internal branding assets copied from the company SSO page.",
      "Host domain was recently registered and is unrelated to corporate identity systems.",
      "Reset workflow requests current password, which is abnormal for the legitimate flow."
    ],
    indicators: [
      {
        type: "Domain",
        value: "reset-company-access[.]com",
        note: "Recently registered impersonation domain."
      },
      {
        type: "URL",
        value: "https://reset-company-access[.]com/verify",
        note: "Credential collection page."
      },
      {
        type: "Keyword",
        value: "Verify your current password",
        note: "Abnormal request in the reset flow."
      }
    ],
    evidence: [
      {
        label: "Host Domain",
        value: "reset-company-access[.]com",
        detail: "Not owned by the company."
      },
      {
        label: "Branding",
        value: "Internal SSO clone",
        detail: "Visual copy intended to lower user suspicion."
      },
      {
        label: "Collection Method",
        value: "Fake reset form",
        detail: "Prompts for live credential entry."
      }
    ],
    recommendedActions: [
      "Escalate to identity and legal teams for takedown review.",
      "Warn users not to use the reset portal.",
      "Monitor for related login attempts against company accounts."
    ],
    guidedQuestions: [
      {
        prompt: "What specific behavior on the page makes it inconsistent with a normal password reset flow?",
        hint: "Compare what legitimate reset portals usually request."
      },
      {
        prompt: "Why is domain registration timing useful in phishing investigations?",
        hint: "Think about campaign setup speed and legitimacy signals."
      }
    ],
    notes: [
      {
        author: "Morgan Diaz",
        timestamp: "13:36",
        type: "Finding",
        body: "The site requests both current and new password values and submits them to a non-corporate host."
      }
    ],
    workflow: [
      {
        name: "Collection",
        state: "Done",
        owner: "SOC Triage",
        description: "Screenshots, source HTML, and host details preserved."
      },
      {
        name: "Analysis",
        state: "Done",
        owner: "Identity Team",
        description: "Confirmed the portal is not associated with the company SSO environment."
      },
      {
        name: "Containment",
        state: "In Progress",
        owner: "Security Engineering",
        description: "Blocking domain and notifying users through security banner."
      },
      {
        name: "Reporting",
        state: "Queued",
        owner: "Incident Lead",
        description: "Executive impact summary pending review."
      }
    ],
    timeline: [
      {
        time: "13:05",
        title: "Ticket opened",
        detail: "User reported a suspicious password reset portal discovered from a browser warning."
      }
    ]
  },
  {
    id: "PTX-4009",
    title: "Shared inbox BEC probe",
    summary: "An external actor attempted conversation hijacking against vendor payment threads in a shared inbox.",
    status: "Monitoring",
    priority: "Medium",
    sourceType: "Social",
    threatLabel: "BEC Attempt",
    riskScore: 68,
    reporter: "Samir Patel",
    assignee: "Morgan Diaz",
    channel: "Shared Mailbox",
    createdAt: "Mar 11, 2026 18:21",
    aiSummary: "Low-volume but credible BEC-style thread hijack attempt with financial pretext overlap.",
    plainExplanation: "This appears to be an attempt to slip into an existing business conversation and redirect trust, possibly toward payment fraud. It is more targeted than general spam and should be handled carefully.",
    findings: [
      "Display name matched a known supplier contact.",
      "Reply-chain language attempted to continue an existing invoice discussion.",
      "No malicious link was needed because the attacker relied on conversation trust."
    ],
    indicators: [
      {
        type: "Sender",
        value: "accounts@northvalley-supplies.co",
        note: "Close visual match to legitimate supplier identity."
      },
      {
        type: "Keyword",
        value: "updated remittance details",
        note: "Classic payment-redirection language."
      },
      {
        type: "Domain",
        value: "northvalley-supplies.co",
        note: "Lookalike vendor infrastructure."
      }
    ],
    evidence: [
      {
        label: "Conversation Type",
        value: "Vendor payment thread",
        detail: "Legitimate business context abused."
      },
      {
        label: "Fraud Theme",
        value: "Payment redirection",
        detail: "Potential downstream invoice fraud."
      },
      {
        label: "Exposure",
        value: "Shared inbox",
        detail: "Higher visibility but also broader risk."
      }
    ],
    recommendedActions: [
      "Validate remittance details with supplier through a trusted channel.",
      "Flag the sender to finance and procurement teams.",
      "Monitor for further reply-chain hijack attempts."
    ],
    guidedQuestions: [
      {
        prompt: "What makes BEC-style messages different from generic phishing emails?",
        hint: "Consider social engineering depth and lack of obvious malware."
      },
      {
        prompt: "What out-of-band validation step would reduce risk here?",
        hint: "Think about supplier verification."
      }
    ],
    notes: [
      {
        author: "Morgan Diaz",
        timestamp: "18:54",
        type: "Observation",
        body: "No clicks observed yet, but sender display name matched active supplier contact."
      }
    ],
    workflow: [
      {
        name: "Collection",
        state: "Done",
        owner: "SOC Triage",
        description: "Captured related thread history and suspicious reply metadata."
      },
      {
        name: "Analysis",
        state: "In Progress",
        owner: "Fraud Response",
        description: "Reviewing invoice references for possible pretext overlap with known fraud attempts."
      },
      {
        name: "Containment",
        state: "Queued",
        owner: "Messaging Team",
        description: "Will purge if additional related messages appear in the environment."
      },
      {
        name: "Reporting",
        state: "Queued",
        owner: "Incident Lead",
        description: "Executive summary not yet required while activity remains low confidence."
      }
    ],
    timeline: [
      {
        time: "18:21",
        title: "Ticket opened",
        detail: "Accounting shared inbox flagged a reply-chain anomaly."
      }
    ]
  }
];
