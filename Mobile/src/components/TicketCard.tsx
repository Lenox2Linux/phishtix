import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Ticket } from "@/types/ticket";
import { colors, shadows } from "@/theme/colors";

import { Pill } from "./Pill";

type TicketCardProps = {
  ticket: Ticket;
  onPress: () => void;
  style?: ViewStyle;
};

export function TicketCard({ onPress, style, ticket }: TicketCardProps) {
  const priorityTone = ticket.priority === "Critical" ? "danger" : ticket.priority === "High" ? "warning" : "brand";

  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.ticketId}>{ticket.id}</Text>
          <Text style={styles.title}>{ticket.title}</Text>
        </View>
        <Pill label={ticket.priority} style={styles.priorityPill} tone={priorityTone} />
      </View>
      <Text style={styles.summary}>{ticket.summary}</Text>
      <View style={styles.divider} />
      <View style={styles.metaRow}>
        <Pill label={ticket.status} tone="brand" />
        <Pill label={ticket.assignee} tone="neutral" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    padding: 18,
    ...shadows.card
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  },
  headerCopy: {
    flex: 1
  },
  ticketId: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5
  },
  title: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800"
  },
  summary: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  divider: {
    marginTop: 14,
    height: 1,
    backgroundColor: colors.border
  },
  metaRow: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  priorityPill: {
    marginLeft: 10
  }
});
