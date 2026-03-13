import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { TimelineItem } from "@/components/TimelineItem";
import { useTicketById } from "@/features/tickets/hooks";
import { colors, shadows } from "@/theme/colors";

export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return (
      <Screen>
        <Text style={styles.notFoundTitle}>Ticket not found</Text>
        <Text style={styles.notFoundBody}>The requested mock ticket does not exist in the local store.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.heroCard}>
        <View style={styles.heroCopy}>
          <Text style={styles.ticketId}>{ticket.id}</Text>
          <Text style={styles.title}>{ticket.title}</Text>
          <Text style={styles.summary}>{ticket.summary}</Text>
        </View>
        <View style={styles.pillRow}>
          <Pill label={ticket.status} tone="brand" />
          <Pill label={`${ticket.priority} Priority`} tone={ticket.priority === "Critical" ? "danger" : "warning"} />
          <Pill label={ticket.channel} tone="neutral" />
        </View>
        <View style={styles.reporterCard}>
          <Text style={styles.reporterLabel}>Reporter</Text>
          <Text style={styles.reporterName}>{ticket.reporter}</Text>
          <Text style={styles.reporterTime}>{ticket.createdAt}</Text>
        </View>
        <View style={styles.buttonRow}>
          <AppButton label="Workflow" onPress={() => router.push(`/(app)/tickets/${ticket.id}/workflow`)} />
          <AppButton label="Notes" onPress={() => router.push(`/(app)/tickets/${ticket.id}/notes`)} variant="secondary" />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Timeline" />
        <View style={styles.timelineList}>
          {ticket.timeline.map((entry) => (
            <TimelineItem key={`${ticket.id}-${entry.time}-${entry.title}`} entry={entry} />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notFoundTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800"
  },
  notFoundBody: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14
  },
  heroCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 16,
    ...shadows.card
  },
  heroCopy: {
    gap: 10
  },
  ticketId: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800"
  },
  summary: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  reporterCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMuted,
    padding: 16,
    gap: 6
  },
  reporterLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  reporterName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  reporterTime: {
    color: colors.textSecondary,
    fontSize: 14
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12
  },
  section: {
    marginTop: 32
  },
  timelineList: {
    marginTop: 14,
    gap: 12
  }
});
