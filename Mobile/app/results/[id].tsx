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

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return (
      <Screen>
        <Text style={styles.notFound}>Result not found.</Text>
      </Screen>
    );
  }

  const riskTone = ticket.priority === "Critical" ? "danger" : ticket.priority === "High" ? "warning" : "brand";

  return (
    <Screen>
      <HeaderBlock
        eyebrow="AI Results"
        subtitle="Quick findings are presented in plain English first, with enough detail to escalate into a full investigation when needed."
        title="Assessment complete"
      />

      <SurfaceCard style={styles.heroCard}>
        <View style={styles.scoreRow}>
          <View>
            <Text style={styles.scoreLabel}>Risk Score</Text>
            <Text style={styles.scoreValue}>{ticket.riskScore}</Text>
          </View>
          <View style={styles.scoreMeta}>
            <Pill label={ticket.threatLabel} tone={riskTone} />
            <Pill label={ticket.sourceType} tone="neutral" />
          </View>
        </View>
        <Text style={styles.summaryTitle}>{ticket.title}</Text>
        <Text style={styles.summaryBody}>{ticket.plainExplanation}</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Indicators found</Text>
        <View style={styles.stack}>
          {ticket.indicators.map((indicator) => (
            <IndicatorRow indicator={indicator} key={`${ticket.id}-${indicator.type}-${indicator.value}`} />
          ))}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Recommended next actions</Text>
        <View style={styles.stack}>
          {ticket.recommendedActions.map((action) => (
            <View key={`${ticket.id}-${action}`} style={styles.actionItem}>
              <View style={styles.actionDot} />
              <Text style={styles.actionText}>{action}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <View style={styles.actionRow}>
        <AppButton label="Convert to Ticket" onPress={() => router.push(`/(app)/investigation/${ticket.id}`)} style={styles.actionButton} />
        <AppButton label="Back to Intake" onPress={() => router.push("/intake")} style={styles.actionButton} variant="secondary" />
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
  heroCard: {
    marginTop: 24
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  scoreValue: {
    marginTop: 6,
    color: colors.textPrimary,
    fontSize: 52,
    fontWeight: "800"
  },
  scoreMeta: {
    gap: 8
  },
  summaryTitle: {
    marginTop: 14,
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800"
  },
  summaryBody: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23
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
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 16,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  actionDot: {
    marginTop: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent
  },
  actionText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21
  },
  actionRow: {
    marginTop: 18,
    flexDirection: "row",
    gap: 12
  },
  actionButton: {
    flex: 1
  }
});
