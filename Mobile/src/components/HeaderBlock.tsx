import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

type HeaderBlockProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function HeaderBlock({ eyebrow, subtitle, title }: HeaderBlockProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
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
  }
});
