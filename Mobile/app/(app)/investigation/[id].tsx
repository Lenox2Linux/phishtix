import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { HeaderBlock } from "@/components/HeaderBlock";
import { IndicatorRow } from "@/components/IndicatorRow";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useTicketById } from "@/features/tickets/hooks";
import { colors } from "@/theme/colors";

export default function InvestigationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return (
      <Screen>
        <Text style={styles.notFound}>Investigation not found.</Text>
      </Screen>
    );
  }

  const severityTone = ticket.priority === "Critical" ? "danger" : ticket.priority === "High" ? "warning" : "brand";

  return (
    <Screen>
      <HeaderBlock
        eyebrow="Hybrid Investigation"
        subtitle="This screen blends plain-English AI triage, guided student prompts, and analyst-ready incident workflow into one investigation surface."
        title={ticket.title}
      />

      <SurfaceCard style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Text style={styles.ticketId}>{ticket.id}</Text>
          <View style={styles.badgeRow}>
            <Pill label={ticket.priority} tone={severityTone} />
            <Pill label={ticket.status} tone="neutral" />
          </View>
        </View>
        <Text style={styles.aiSummary}>{ticket.aiSummary}</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Evidence</Text>
        <View style={styles.stack}>
          {ticket.evidence.map((item) => (
            <View key={`${ticket.id}-${item.label}`} style={styles.evidenceCard}>
              <Text style={styles.evidenceLabel}>{item.label}</Text>
              <Text style={styles.evidenceValue}>{item.value}</Text>
              <Text style={styles.evidenceDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Indicators</Text>
        <View style={styles.stack}>
          {ticket.indicators.map((indicator) => (
            <IndicatorRow indicator={indicator} key={`${ticket.id}-${indicator.type}-${indicator.value}`} />
          ))}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Guided Questions</Text>
        <View style={styles.stack}>
          {ticket.guidedQuestions.map((question) => (
            <View key={`${ticket.id}-${question.prompt}`} style={styles.questionCard}>
              <Text style={styles.questionPrompt}>{question.prompt}</Text>
              <Text style={styles.questionHint}>Hint: {question.hint}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Analyst Notes</Text>
        <View style={styles.stack}>
          {ticket.notes.map((note) => (
            <View key={`${ticket.id}-${note.author}-${note.timestamp}`} style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <Text style={styles.noteAuthor}>{note.author}</Text>
                <Pill label={note.type} tone="neutral" />
              </View>
              <Text style={styles.noteTime}>{note.timestamp}</Text>
              <Text style={styles.noteBody}>{note.body}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <View style={styles.actionGrid}>
        <AppButton label="Investigate" onPress={() => router.push(`/(app)/tickets/${ticket.id}/workflow`)} style={styles.actionButton} />
        <AppButton label="Contain" onPress={() => router.push(`/(app)/tickets/${ticket.id}`)} style={styles.actionButton} variant="secondary" />
      </View>
      <View style={styles.actionGrid}>
        <AppButton label="Report" onPress={() => router.push("/(app)/reports")} style={styles.actionButton} variant="secondary" />
        <AppButton label="Export" onPress={() => router.push(`/(app)/export/${ticket.id}`)} style={styles.actionButton} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notFound: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700"
  },
  headerCard: {
    marginTop: 24
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  ticketId: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.6
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8
  },
  aiSummary: {
    marginTop: 14,
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600"
  },
  sectionCard: {
    marginTop: 18
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  stack: {
    marginTop: 14,
    gap: 10
  },
  evidenceCard: {
    borderRadius: 18,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  evidenceLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  evidenceValue: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700"
  },
  evidenceDetail: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20
  },
  questionCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMuted,
    padding: 14
  },
  questionPrompt: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700"
  },
  questionHint: {
    marginTop: 8,
    color: colors.accent,
    fontSize: 13,
    lineHeight: 20
  },
  noteCard: {
    borderRadius: 18,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  noteAuthor: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700"
  },
  noteTime: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  noteBody: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  actionGrid: {
    marginTop: 12,
    flexDirection: "row",
    gap: 12
  },
  actionButton: {
    flex: 1
  }
});
