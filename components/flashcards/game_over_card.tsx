import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function GameOverCard({
  score,
  total,
  onRestart,
  onHome,
}: Props) {
  return (
    <View style={styles.gameOverCard}>
      <Text style={styles.gameOverTitle}>🎉 Game Over!</Text>
      <Text style={styles.gameOverSubtitle}>
        You have finished all flashcards
      </Text>
      <Text style={styles.gameOverScore}>
        Your score: {score} / {total}
      </Text>

      <View style={styles.gameOverButtons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#34d399" }]}
          onPress={onRestart}
        >
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f87171" }]}
          onPress={onHome}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameOverCard: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  gameOverSubtitle: {
    fontSize: 18,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  gameOverScore: {
    fontSize: 28,
    fontWeight: "700",
    color: "#10b981",
    marginBottom: 30,
    textAlign: "center",
  },
  gameOverButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    gap: 10,
  },
  button: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
