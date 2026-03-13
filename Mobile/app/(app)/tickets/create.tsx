import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { useTicketsStore } from "@/providers/AppProvider";
import { colors, shadows } from "@/theme/colors";

export default function CreateTicketScreen() {
  const { createFromTemplate } = useTicketsStore();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Create Ticket</Text>
        <Text style={styles.title}>Capture a new phishing lead</Text>
        <Text style={styles.subtitle}>
          This screen uses mock inputs for now and creates a local ticket entry so navigation and layouts are ready for API integration later.
        </Text>
      </View>

      <View style={styles.panel}>
        <TextInput
          editable={false}
          defaultValue="Suspicious Microsoft 365 credential lure"
          style={styles.input}
        />
        <TextInput
          editable={false}
          defaultValue="finance@external-mail.co"
          style={styles.input}
        />
        <TextInput
          editable={false}
          defaultValue="High"
          style={styles.input}
        />
        <TextInput
          editable={false}
          multiline
          numberOfLines={5}
          defaultValue="User reported a payroll-themed email with a credential harvest link and urgent language targeting the accounting team."
          style={[styles.input, styles.textarea]}
          textAlignVertical="top"
        />
        <AppButton
          label="Create Mock Ticket"
          onPress={() => {
            const ticket = createFromTemplate();
            router.replace(`/(app)/tickets/${ticket.id}`);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
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
  },
  panel: {
    marginTop: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 14,
    ...shadows.card
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
  textarea: {
    minHeight: 132
  }
});
