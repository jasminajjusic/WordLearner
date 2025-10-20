import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScoreScreen() {
  const router = useRouter();
  const { score = "0", total = "0" } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Finished</Text>
      <Text style={styles.subtitle}>Your score</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreNumber}>
          {score} / {total}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/multiple_choice")}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Back to Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  secondaryButton: { backgroundColor: "#6c757d" },
  buttonText: { color: "white", fontWeight: "600", textAlign: "center" },
  scoreBox: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
  },
  scoreNumber: { fontSize: 28, fontWeight: "700" },
});
