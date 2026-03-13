import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useTicketById } from "@/features/tickets/hooks";
import { colors, shadows } from "@/theme/colors";

export default function WorkflowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Investigation Workflow</Text>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.subtitle}>
          A structured workflow view helps the team keep collection, analysis, containment, and reporting aligned.
        </Text>
      </View>

      <View style={styles.list}>
        {ticket.workflow.map((step, index) => (
          <View key={`${ticket.id}-step-${step.name}`} style={styles.card}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>
                {index + 1}. {step.name}
              </Text>
              <Pill label={step.state} tone={step.state === "Done" ? "success" : step.state === "In Progress" ? "warning" : "neutral"} />
            </View>
            <Text style={styles.description}>{step.description}</Text>
            <Text style={styles.ownerLabel}>Owner</Text>
            <Text style={styles.owner}>{step.owner}</Text>
          </View>
        ))}
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
  list: {
    marginTop: 24,
    gap: 12
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    ...shadows.card
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  stepTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700"
  },
  description: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  ownerLabel: {
    marginTop: 16,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  owner: {
    marginTop: 4,
    color: colors.textPrimary,
    fontSize: 14
  }
});
