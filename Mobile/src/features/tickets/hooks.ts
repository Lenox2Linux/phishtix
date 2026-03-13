import { useMemo } from "react";

import { useTicketsStore } from "@/providers/AppProvider";

export function useTickets() {
  const { tickets } = useTicketsStore();
  return tickets;
}

export function useTicketById(id?: string) {
  const { tickets } = useTicketsStore();

  return useMemo(() => tickets.find((ticket) => ticket.id === id), [id, tickets]);
}

export function useTicketMetrics() {
  const { tickets } = useTicketsStore();

  return useMemo(() => {
    const critical = tickets.filter((ticket) => ticket.priority === "Critical").length;
    const containment = tickets.filter((ticket) => ticket.status === "Containment").length;
    const escalated = tickets.filter((ticket) => ticket.priority === "Critical" || ticket.priority === "High").length;
    const resolved = tickets.filter((ticket) => ticket.workflow.every((step) => step.state === "Done")).length;

    return {
      open: tickets.length,
      critical,
      containment,
      escalated,
      resolved
    };
  }, [tickets]);
}
