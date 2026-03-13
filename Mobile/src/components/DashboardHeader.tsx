import { StyleSheet, Text, View } from "react-native";

import { useAppContext } from "@/providers/AppProvider";
import { colors, shadows } from "@/theme/colors";

export function DashboardHeader() {
  const { user } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.kicker}>SOC Dashboard</Text>
        <Text style={styles.title}>Welcome back, {user.name.split(" ")[0]}</Text>
        <Text style={styles.subtitle}>
          Your mobile queue is synced to local mock data for rapid UI iteration.
        </Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    paddingRight: 16
  },
  kicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase"
  },
  title: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 31,
    fontWeight: "800"
  },
  subtitle: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceRaised,
    borderColor: "#1F585F",
    borderWidth: 1,
    ...shadows.glow
  },
  avatarText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "800"
  }
});
