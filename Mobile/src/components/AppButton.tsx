import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, shadows } from "@/theme/colors";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export function AppButton({ label, onPress, style, variant = "primary" }: AppButtonProps) {
  return (
    <Pressable
      style={[styles.button, variant === "primary" ? styles.primaryButton : styles.secondaryButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.label, variant === "primary" ? styles.primaryLabel : styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingHorizontal: 20
  },
  primaryButton: {
    backgroundColor: colors.accent,
    ...shadows.glow
  },
  secondaryButton: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.borderStrong
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4
  },
  primaryLabel: {
    color: colors.background
  },
  secondaryLabel: {
    color: colors.textPrimary
  }
});
