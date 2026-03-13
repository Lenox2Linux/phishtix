import { StyleSheet, Text, View } from "react-native";

import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useTicketMetrics, useTickets } from "@/features/tickets/hooks";
import { colors } from "@/theme/colors";

export default function ReportsScreen() {
  const tickets = useTickets();
  const metrics = useTicketMetrics();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Reports</Text>
        <Text style={styles.title}>Operational snapshot</Text>
        <Text style={styles.subtitle}>
          This report screen summarizes the mock ticket set and gives product-ready structure for future analytics endpoints.
        </Text>
      </View>

      <View style={styles.cards}>
        <InfoCard label="Average SLA" value="2h 14m" tone="surface" description="Median analyst first response time across the local ticket sample." />
        <InfoCard label="Resolved Today" value={`${metrics.resolved}`} tone="surface" description="Tickets that completed containment and reporting in the active shift." />
        <InfoCard label="Mailboxes Hit" value="14" tone="surface" description="Unique targeted user groups represented across these incidents." />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Priority Distribution" />
        <View style={styles.cards}>
          <InfoCard label="Critical" value={`${tickets.filter((ticket) => ticket.priority === "Critical").length}`} tone="danger" />
          <InfoCard label="High" value={`${tickets.filter((ticket) => ticket.priority === "High").length}`} tone="warning" />
          <InfoCard label="Medium" value={`${tickets.filter((ticket) => ticket.priority === "Medium").length}`} tone="brand" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  cards: {
    marginTop: 16,
    gap: 12
  },
  section: {
    marginTop: 32
  }
});
