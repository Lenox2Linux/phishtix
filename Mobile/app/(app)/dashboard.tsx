import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { DashboardHeader } from "@/components/DashboardHeader";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { TicketCard } from "@/components/TicketCard";
import { useTicketMetrics, useTickets } from "@/features/tickets/hooks";
import { colors, shadows } from "@/theme/colors";

export default function DashboardScreen() {
  const tickets = useTickets();
  const metrics = useTicketMetrics();

  return (
    <Screen>
      <DashboardHeader />

      <View style={styles.metricsRow}>
        <InfoCard label="Open" value={metrics.open.toString()} tone="brand" />
        <InfoCard label="Critical" value={metrics.critical.toString()} tone="danger" />
        <InfoCard label="Containment" value={metrics.containment.toString()} tone="warning" />
      </View>

      <View style={styles.commandCard}>
        <View style={styles.commandHeaderRow}>
          <View style={styles.commandCopy}>
            <Text style={styles.commandEyebrow}>Threat Watch</Text>
            <Text style={styles.commandTitle}>Keep investigations moving without leaving the field.</Text>
          </View>
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Queue</Text>
          </View>
        </View>
        <Text style={styles.commandBody}>
          Use quick actions to create tickets, review notes, and finalize reports while you are on-call.
        </Text>
        <View style={styles.commandMetrics}>
          <InfoCard compact label="Tickets" value={tickets.length.toString()} tone="inverted" />
          <InfoCard compact label="Escalated" value={metrics.escalated.toString()} tone="inverted" />
        </View>
        <View style={styles.actionRow}>
          <AppButton
            label="Create Ticket"
            onPress={() => router.push("/(app)/tickets/create")}
            style={styles.actionButton}
          />
          <AppButton
            label="View Reports"
            onPress={() => router.push("/(app)/reports")}
            style={styles.actionButton}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          actionLabel="Create Ticket"
          onAction={() => router.push("/(app)/tickets/create")}
          title="Active Tickets"
        />
        <View style={styles.list}>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onPress={() => router.push(`/(app)/tickets/${ticket.id}`)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          actionLabel="View Reports"
          onAction={() => router.push("/(app)/reports")}
          title="Investigation Focus"
        />
        <View style={styles.list}>
          <InfoCard
            description="Evidence collection is lagging on two tickets and should be reviewed before handoff."
            label="Workflow Attention"
            tone="surface"
            value="2"
          />
          <InfoCard
            description="Notes coverage is strong overall, with one ticket missing final analyst recommendations."
            label="Notes Ready"
            tone="surface"
            value="5/6"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metricsRow: {
    marginTop: 24,
    flexDirection: "row",
    gap: 12
  },
  commandCard: {
    marginTop: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1F585F",
    backgroundColor: colors.backgroundAlt,
    padding: 20,
    ...shadows.card
  },
  commandHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  },
  commandCopy: {
    flex: 1
  },
  commandEyebrow: {
    color: "#9AF3EC",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  commandTitle: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800"
  },
  commandBody: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  commandMetrics: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12
  },
  liveChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success
  },
  liveText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1
  },
  actionRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12
  },
  actionButton: {
    flex: 1
  },
  section: {
    marginTop: 32
  },
  list: {
    marginTop: 14,
    gap: 12
  }
});
