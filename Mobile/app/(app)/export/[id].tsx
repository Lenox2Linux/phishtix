import { useLocalSearchParams } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

import { HeaderBlock } from "@/components/HeaderBlock";
import { Screen } from "@/components/Screen";
import { SurfaceCard } from "@/components/SurfaceCard";
import { useTicketById } from "@/features/tickets/hooks";
import { buildTicketMarkdown } from "@/services/export";
import { colors } from "@/theme/colors";

export default function ExportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return (
      <Screen>
        <Text style={styles.notFound}>Export not found.</Text>
      </Screen>
    );
  }

  const markdown = buildTicketMarkdown(ticket);

  return (
    <Screen>
      <HeaderBlock
        eyebrow="Ticket Export"
        subtitle="Use this markdown-ready structure for portfolio artifacts, case write-ups, or analyst handoff documentation."
        title={`Export ${ticket.id}`}
      />

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Export preview</Text>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Title</Text>
          <Text style={styles.metaValue}>{ticket.title}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Summary</Text>
          <Text style={styles.metaBody}>{ticket.summary}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Indicators</Text>
          <Text style={styles.metaBody}>{ticket.indicators.map((indicator) => indicator.value).join(", ")}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Findings</Text>
          <Text style={styles.metaBody}>{ticket.findings.join(" ")}</Text>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Markdown-ready output</Text>
        <View style={styles.markdownCard}>
          <Text style={styles.markdownText}>{markdown}</Text>
        </View>
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notFound: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700"
  },
  sectionCard: {
    marginTop: 24
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  metaCard: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  metaValue: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700"
  },
  metaBody: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  markdownCard: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: colors.backgroundChrome,
    padding: 16
  },
  markdownText: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 21,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" })
  }
});
