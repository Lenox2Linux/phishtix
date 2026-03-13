import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
};

export function Screen({ children, padded = true, scrollable = true }: ScreenProps) {
  const content = <View style={padded ? styles.content : styles.fill}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      {scrollable ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#081120"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32
  },
  fill: {
    flex: 1
  }
});
