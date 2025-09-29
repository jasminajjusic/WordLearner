import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWordScrambleStore } from "../stores/wordScrambleStore";

function shuffleString(str: string) {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export default function WordScrambleScreen() {
  const router = useRouter();
  const { words, currentIndex, score, nextWord, markCorrect, resetGame } =
    useWordScrambleStore();

  const [input, setInput] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (currentIndex < words.length) {
      setScrambled(shuffleString(words[currentIndex].word));
      setInput("");
      setShowAnswer(false);
    }
  }, [currentIndex]);

  if (currentIndex >= words.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.subtitle}>You have finished all words!</Text>
        <Text style={styles.score}>
          Your score: {score} / {words.length}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#34d399", marginTop: 20 }]}
          onPress={resetGame}
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Restart Game
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f87171", marginTop: 15 }]}
          onPress={() => router.push("/")}
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const word = words[currentIndex].word;

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === word.toLowerCase()) {
      markCorrect();
      nextWord();
      setInput("");
    } else {
      setShowAnswer(true);
      setTimeout(() => {
        nextWord();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unscramble the word:</Text>
      <Text style={styles.scrambled}>{scrambled}</Text>

      <TextInput
        style={styles.input}
        placeholder="Type the word"
        value={input}
        onChangeText={setInput}
      />

      {showAnswer && <Text style={styles.answer}>Correct: {word}</Text>}

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
    marginBottom: 20,
    textAlign: "center",
  },
  scrambled: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
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
  answer: {
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
