import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { ModeCard } from "@/components/ModeCard";
import { Screen } from "@/components/Screen";
import { SurfaceCard } from "@/components/SurfaceCard";
import { colors, shadows } from "@/theme/colors";

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>PT</Text>
          </View>
          <Text style={styles.badge}>AI Security</Text>
        </View>
        <Text style={styles.slogan}>Don&apos;t Take the Bait</Text>
        <Text style={styles.subline}>
          AI-Powered Phishing Detection for Users, Students, and Analysts
        </Text>
        <Text style={styles.supporting}>
          PhishTix gives everyday users quick answers, guides students through investigations, and helps analysts work cases in a realistic SOC flow.
        </Text>
        <View style={styles.actionRow}>
          <AppButton
            label="Analyze Message"
            onPress={() => router.push("/intake")}
            style={styles.primaryAction}
          />
          <AppButton
            label="See Demo"
            onPress={() => router.push("/results/PTX-4012")}
            style={styles.secondaryAction}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.modeGrid}>
        <ModeCard
          accent={colors.accent}
          description="Paste a message, URL, screenshot, or number and get a clear answer in plain language."
          onPress={() => router.push("/intake")}
          title="User Mode"
        />
        <ModeCard
          accent={colors.warning}
          description="Work through guided questions, hints, and portfolio-ready notes from realistic phishing cases."
          onPress={() => router.push("/results/PTX-4011")}
          title="Student Mode"
        />
      </View>

      <View style={styles.modeGrid}>
        <ModeCard
          accent={colors.info}
          description="Operate a queue, open tickets, review notes, and move incidents through containment and reporting."
          onPress={() => router.push("/login")}
          title="Analyst Mode"
        />
        <ModeCard
          accent={colors.success}
          description="Reporting and trend analysis will expand here as the admin and oversight layer grows."
          onPress={() => router.push("/(app)/reports")}
          title="Admin Preview"
        />
      </View>

      <SurfaceCard style={styles.previewCard}>
        <Text style={styles.previewEyebrow}>Product Preview</Text>
        <Text style={styles.previewTitle}>From quick answer to full case workflow</Text>
        <Text style={styles.previewBody}>
          Start with simple AI triage, escalate into guided learning, and finish with analyst-ready evidence and exportable documentation.
        </Text>
        <View style={styles.previewStats}>
          <View style={styles.previewStat}>
            <Text style={styles.previewStatValue}>5</Text>
            <Text style={styles.previewStatLabel}>Demo cases</Text>
          </View>
          <View style={styles.previewStat}>
            <Text style={styles.previewStatValue}>3</Text>
            <Text style={styles.previewStatLabel}>Core modes</Text>
          </View>
          <View style={styles.previewStat}>
            <Text style={styles.previewStatValue}>1</Text>
            <Text style={styles.previewStatLabel}>Stable style system</Text>
          </View>
        </View>
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundAlt,
    padding: 24,
    ...shadows.card
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1F585F",
    backgroundColor: colors.surfaceRaised,
    ...shadows.glow
  },
  logoText: {
    color: colors.accentStrong,
    fontSize: 22,
    fontWeight: "800"
  },
  badge: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  slogan: {
    marginTop: 20,
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800"
  },
  subline: {
    marginTop: 10,
    color: colors.accentStrong,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700"
  },
  supporting: {
    marginTop: 14,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23
  },
  actionRow: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12
  },
  primaryAction: {
    flex: 1
  },
  secondaryAction: {
    flex: 1
  },
  modeGrid: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12
  },
  previewCard: {
    marginTop: 20
  },
  previewEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  previewTitle: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800"
  },
  previewBody: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  previewStats: {
    marginTop: 18,
    flexDirection: "row",
    gap: 12
  },
  previewStat: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  previewStatValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800"
  },
  previewStatLabel: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600"
  }
});
