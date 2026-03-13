import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, shadows } from "@/theme/colors";

type Tone = "brand" | "danger" | "warning" | "success" | "surface" | "inverted";

type InfoCardProps = {
  label: string;
  value: string;
  description?: string;
  compact?: boolean;
  tone?: Tone;
  style?: ViewStyle;
};

const toneStyles: Record<Tone, { card: ViewStyle; label: object; value: object; description: object }> = {
  brand: {
    card: { borderColor: "#1C5860", backgroundColor: colors.surfaceStrong },
    label: { color: colors.accent },
    value: { color: colors.textPrimary },
    description: { color: colors.textSecondary }
  },
  danger: {
    card: { borderColor: "#5A2231", backgroundColor: "#301721" },
    label: { color: colors.danger },
    value: { color: colors.textPrimary },
    description: { color: colors.textSecondary }
  },
  warning: {
    card: { borderColor: "#66431B", backgroundColor: "#332514" },
    label: { color: colors.warning },
    value: { color: colors.textPrimary },
    description: { color: colors.textSecondary }
  },
  success: {
    card: { borderColor: "#1B5A39", backgroundColor: "#153022" },
    label: { color: colors.success },
    value: { color: colors.textPrimary },
    description: { color: colors.textSecondary }
  },
  surface: {
    card: { borderColor: colors.border, backgroundColor: colors.surfaceRaised, ...shadows.card },
    label: { color: colors.textMuted },
    value: { color: colors.textPrimary },
    description: { color: colors.textSecondary }
  },
  inverted: {
    card: { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.08)" },
    label: { color: "#C8FAF6" },
    value: { color: colors.white },
    description: { color: "#C8FAF6" }
  }
};

export function InfoCard({ compact = false, description, label, style, tone = "brand", value }: InfoCardProps) {
  const palette = toneStyles[tone];

  return (
    <View style={[styles.card, palette.card, style]}>
      <Text style={[styles.label, palette.label]}>{label}</Text>
      <Text style={[compact ? styles.valueCompact : styles.value, palette.value]}>{value}</Text>
      {description ? <Text style={[styles.description, palette.description]}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase"
  },
  value: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "800"
  },
  valueCompact: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "800"
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22
  }
});
