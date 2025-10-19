import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameOverCardProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverCard: React.FC<GameOverCardProps> = ({
  score,
  total,
  onRestart,
  onHome,
}) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}> Game Over!</Text>
      <Text style={styles.subtitle}>You have finished all translations</Text>
      <Text style={styles.score}>
        Your score: {score} / {total}
      </Text>

      <View style={styles.buttons}>
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
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
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
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, color: "#6b7280", marginBottom: 20 },
  score: {
    fontSize: 28,
    fontWeight: "700",
    color: "#10b981",
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "700" },
});
