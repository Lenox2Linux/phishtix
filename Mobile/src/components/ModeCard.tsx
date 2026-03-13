import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

type ModeCardProps = {
  title: string;
  description: string;
  accent: string;
  onPress?: () => void;
};

export function ModeCard({ accent, description, onPress, title }: ModeCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 148,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    padding: 18
  },
  accentBar: {
    width: 40,
    height: 5,
    borderRadius: 999
  },
  title: {
    marginTop: 16,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  description: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21
  }
});
