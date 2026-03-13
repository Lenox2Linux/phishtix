import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useTicketById } from "@/features/tickets/hooks";
import { colors, shadows } from "@/theme/colors";

export default function NotesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ticket = useTicketById(id);

  if (!ticket) {
    return null;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Notes</Text>
        <Text style={styles.title}>Analyst record for {ticket.id}</Text>
        <Text style={styles.subtitle}>
          Mock notes are stored locally so the app structure is ready for collaborative note sync later.
        </Text>
      </View>

      <View style={styles.list}>
        {ticket.notes.map((note) => (
          <View key={`${ticket.id}-${note.author}-${note.timestamp}`} style={styles.card}>
            <View style={styles.noteHeader}>
              <Text style={styles.author}>{note.author}</Text>
              <Pill label={note.type} tone="neutral" />
            </View>
            <Text style={styles.timestamp}>{note.timestamp}</Text>
            <Text style={styles.body}>{note.body}</Text>
          </View>
        ))}
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
  list: {
    marginTop: 24,
    gap: 12
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    ...shadows.card
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  author: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  timestamp: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  body: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22
  }
});
