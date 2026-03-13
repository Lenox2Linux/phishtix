import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { Indicator } from "@/types/ticket";

type IndicatorRowProps = {
  indicator: Indicator;
};

export function IndicatorRow({ indicator }: IndicatorRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.labelWrap}>
        <Text style={styles.type}>{indicator.type}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.value}>{indicator.value}</Text>
        <Text style={styles.note}>{indicator.note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    padding: 14
  },
  labelWrap: {
    borderRadius: 999,
    backgroundColor: colors.backgroundChrome,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  type: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  copy: {
    flex: 1
  },
  value: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  note: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19
  }
});
