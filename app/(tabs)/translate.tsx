import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslateStore } from "../stores/translateStore";

export default function TranslateScreen() {
  const router = useRouter();
  const { cards, currentIndex, score, nextCard, markCorrect, resetGame } =
    useTranslateStore();

  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  if (currentIndex >= cards.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.subtitle}>You have finished all translations!</Text>
        <Text style={styles.score}>
          Your score: {score} / {cards.length}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#34d399",
              marginTop: 20,
              width: 200,
              height: 60,
            },
          ]}
          onPress={() => {
            resetGame();
            setInput("");
          }}
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Restart Game
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#f87171",
              marginTop: 15,
              width: 200,
              height: 60,
            },
          ]}
          onPress={() => router.push("/")}
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const card = cards[currentIndex];

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === card.answer.toLowerCase()) {
      markCorrect();
      nextCard();
      setInput("");
    } else {
      setShowAnswer(true);
      setTimeout(() => {
        nextCard();
        setInput("");
        setShowAnswer(false);
      }, 1000); // pokaži prijevod 1 sekundu
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate the word:</Text>
      <Text style={styles.word}>{card.question}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter translation"
        value={input}
        onChangeText={setInput}
      />

      {showAnswer && (
        <Text style={styles.translation}>Correct: {card.answer}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#34d399", marginTop: 20 }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  word: {
    fontSize: 32,
    fontWeight: "700",
    marginVertical: 20,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    width: "80%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "white",
  },
  translation: {
    fontSize: 20,
    color: "#f87171",
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  score: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
});
