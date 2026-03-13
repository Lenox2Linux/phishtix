import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { TimelineEntry } from "@/types/ticket";

type TimelineItemProps = {
  entry: TimelineEntry;
};

export function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.time}>{entry.time}</Text>
      </View>
      <Text style={styles.detail}>{entry.detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  time: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  detail: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  }
});
