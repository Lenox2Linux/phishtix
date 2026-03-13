import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { HeaderBlock } from "@/components/HeaderBlock";
import { Screen } from "@/components/Screen";
import { SurfaceCard } from "@/components/SurfaceCard";
import { colors } from "@/theme/colors";
import { SourceType } from "@/types/ticket";

const sourceTypes: SourceType[] = ["Email", "SMS", "Social", "Website"];

const demoRouteBySource: Record<SourceType, string> = {
  Email: "PTX-4012",
  SMS: "PTX-4010",
  Social: "PTX-4009",
  Website: "PTX-4008"
};

export default function IntakeScreen() {
  const [sourceType, setSourceType] = useState<SourceType>("Email");
  const [messageText, setMessageText] = useState("");
  const [url, setUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const demoTarget = useMemo(() => demoRouteBySource[sourceType], [sourceType]);

  return (
    <Screen>
      <HeaderBlock
        eyebrow="Intake"
        subtitle="Submit suspicious content safely. The current prototype maps your source type to a realistic seeded phishing case."
        title="Analyze suspicious content"
      />

      <SurfaceCard style={styles.formCard}>
        <Text style={styles.label}>Source Type</Text>
        <View style={styles.sourceRow}>
          {sourceTypes.map((option) => {
            const active = option === sourceType;
            return (
              <Pressable
                key={option}
                onPress={() => setSourceType(option)}
                style={[styles.sourceChip, active ? styles.sourceChipActive : styles.sourceChipInactive]}
              >
                <Text style={[styles.sourceChipText, active ? styles.sourceChipTextActive : styles.sourceChipTextInactive]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Upload Screenshot</Text>
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Screenshot upload placeholder</Text>
          <Text style={styles.uploadBody}>Wire in Expo image picker later. For now, this route demonstrates the intake flow safely with mock case data.</Text>
        </View>

        <Text style={styles.label}>Paste Suspicious Text</Text>
        <TextInput
          multiline
          onChangeText={setMessageText}
          placeholder="Paste the message body, social DM, or suspicious wording here."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.textarea]}
          textAlignVertical="top"
          value={messageText}
        />

        <Text style={styles.label}>Enter URL</Text>
        <TextInput
          onChangeText={setUrl}
          placeholder="https://example-link.com"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={url}
        />

        <Text style={styles.label}>Enter Phone Number</Text>
        <TextInput
          onChangeText={setPhoneNumber}
          placeholder="+1 (555) 000-0000"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={phoneNumber}
        />

        <View style={styles.noteBar}>
          <Text style={styles.noteTitle}>Demo behavior</Text>
          <Text style={styles.noteBody}>
            Current selection will open seeded case {demoTarget} so the analysis flow is usable before backend inference is wired in.
          </Text>
        </View>

        <AppButton label="Analyze" onPress={() => router.push(`/results/${demoTarget}`)} />
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formCard: {
    marginTop: 24,
    gap: 12
  },
  label: {
    marginTop: 4,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  sourceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  sourceChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  sourceChipActive: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent
  },
  sourceChipInactive: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderStrong
  },
  sourceChipText: {
    fontSize: 13,
    fontWeight: "700"
  },
  sourceChipTextActive: {
    color: colors.background
  },
  sourceChipTextInactive: {
    color: colors.textPrimary
  },
  uploadBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.backgroundChrome,
    padding: 16
  },
  uploadTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700"
  },
  uploadBody: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 15
  },
  textarea: {
    minHeight: 120
  },
  noteBar: {
    borderRadius: 18,
    backgroundColor: colors.backgroundChrome,
    padding: 14
  },
  noteTitle: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  noteBody: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20
  }
});
