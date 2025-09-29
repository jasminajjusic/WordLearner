import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGameStore } from "../stores/gameStore";

export default function GameScreen() {
  const router = useRouter();
  const { current, choices, round, totalRounds, score, nextRound } =
    useGameStore();

  function onChoose(choice: string) {
    const correct = choice === current.correct;

    Alert.alert(
      correct ? "✅ Correct!" : "❌ Wrong",
      `Answer: ${current.correct}`,
      [
        {
          text: "Next",
          onPress: () => {
            if (round + 1 >= totalRounds) {
              router.replace({
                pathname: "/score",
                params: {
                  score: String(correct ? score + 1 : score),
                  total: String(totalRounds),
                },
              });
            } else {
              nextRound(correct);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.progress}>
        Round {round + 1} / {totalRounds}
      </Text>

      <View style={styles.wordBox}>
        <Text style={styles.word}>{current.word}</Text>
      </View>

      <View style={styles.choices}>
        {choices.map((c) => (
          <TouchableOpacity
            key={c}
            style={styles.choice}
            onPress={() => onChoose(c)}
          >
            <Text style={styles.choiceText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>⭐ Score: {score}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: "#f3f4f6",
  },
  progress: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 28,
  },
  wordBox: {
    backgroundColor: "#2563eb",
    paddingVertical: 36,
    borderRadius: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  word: {
    fontSize: 38,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    letterSpacing: 1,
  },
  choices: { gap: 18, marginBottom: 40 },
  choice: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  choiceText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  scoreBox: { marginTop: "auto", alignItems: "center", paddingVertical: 16 },
  scoreText: { fontSize: 20, fontWeight: "700", color: "#111827" },
});
