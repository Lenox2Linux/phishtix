import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, shadows } from "@/theme/colors";

type SurfaceCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function SurfaceCard({ children, style }: SurfaceCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    padding: 20,
    ...shadows.card
  }
});
