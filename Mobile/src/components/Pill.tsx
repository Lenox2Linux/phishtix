import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors } from "@/theme/colors";

type PillTone = "brand" | "danger" | "warning" | "success" | "neutral";

const toneStyles: Record<PillTone, { container: ViewStyle; label: object }> = {
  brand: {
    container: { borderColor: "#1F585F", backgroundColor: colors.accentMuted },
    label: { color: colors.accent }
  },
  danger: {
    container: { borderColor: "#6A2533", backgroundColor: "#321A20" },
    label: { color: "#FF7C87" }
  },
  warning: {
    container: { borderColor: "#6D481A", backgroundColor: "#362916" },
    label: { color: "#FFB74D" }
  },
  success: {
    container: { borderColor: "#1F6440", backgroundColor: "#163120" },
    label: { color: "#4ADE80" }
  },
  neutral: {
    container: { borderColor: colors.borderStrong, backgroundColor: colors.surfaceMuted },
    label: { color: colors.textSecondary }
  }
};

type PillProps = {
  label: string;
  tone?: PillTone;
  style?: ViewStyle;
};

export function Pill({ label, style, tone = "brand" }: PillProps) {
  const palette = toneStyles[tone];

  return (
    <View style={[styles.container, palette.container, style]}>
      <Text style={[styles.label, palette.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.15,
    textTransform: "uppercase"
  }
});
