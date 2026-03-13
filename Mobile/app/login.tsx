import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { useAppContext } from "@/providers/AppProvider";
import { colors, shadows } from "@/theme/colors";

export default function LoginScreen() {
  const { login, user } = useAppContext();

  return (
    <Screen scrollable={false} padded={false}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.backgroundOrbLarge} />
          <View style={styles.backgroundOrbSmall} />
          <View style={styles.logoRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PT</Text>
            </View>
            <View style={styles.signalChip}>
              <Text style={styles.signalText}>SOC Secure</Text>
            </View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>Security Operations</Text>
            <Text style={styles.title}>PhishTix</Text>
            <Text style={styles.subtitle}>
              Triage phishing investigations, coordinate notes, and move tickets through a consistent response workflow.
            </Text>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelEyebrow}>Analyst Access</Text>
            <Text style={styles.panelTitle}>Sign in to the mobile SOC console</Text>
            <Text style={styles.panelBody}>Use the mock login below to enter the mobile workflow.</Text>
          </View>
          <View style={styles.signalRow}>
            <View style={styles.signalDot} />
            <Text style={styles.signalRowText}>Mock environment active</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            defaultValue={user.email}
            editable={false}
            style={styles.input}
            placeholder="analyst@phishtix.local"
            placeholderTextColor={colors.textMuted}
          />
          <TextInput
            defaultValue="password"
            editable={false}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
          />
          <AppButton
            style={styles.buttonSpacing}
            label="Continue to Dashboard"
            onPress={() => {
              login();
              router.replace("/(app)/dashboard");
            }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: 36
  },
  hero: {
    marginTop: 48,
    position: "relative"
  },
  backgroundOrbLarge: {
    position: "absolute",
    top: -12,
    right: 18,
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#0E2730"
  },
  backgroundOrbSmall: {
    position: "absolute",
    top: 72,
    right: -10,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#0D1C31"
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
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
  signalChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F585F",
    backgroundColor: colors.backgroundChrome,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  signalText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1
  },
  heroCopy: {
    marginTop: 22
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase"
  },
  title: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: "800"
  },
  subtitle: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25
  },
  panel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    padding: 20,
    gap: 14,
    ...shadows.card
  },
  panelHeader: {
    marginBottom: 4
  },
  panelEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  panelTitle: {
    marginTop: 8,
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800"
  },
  panelBody: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  },
  signalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    backgroundColor: colors.backgroundChrome,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  signalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success
  },
  signalRowText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600"
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 15
  },
  buttonSpacing: {
    marginTop: 6
  }
});
