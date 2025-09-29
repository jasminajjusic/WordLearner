import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFlashcardsStore } from "../stores/flashcardsStore";

const { width } = Dimensions.get("window");

export default function FlashcardsScreen() {
  const router = useRouter();
  const { cards, currentIndex, nextCard, markKnown, resetGame, score } =
    useFlashcardsStore();
  const [showTranslation, setShowTranslation] = useState(false);

  const nextCardHandler = () => {
    nextCard();
  };

  if (currentIndex >= cards.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.subtitle}>You have finished all flashcards!</Text>
        <Text style={styles.score}>
          Your score: {score} / {cards.length}
        </Text>

        {/* Veće Restart dugme */}
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
          onPress={resetGame}
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Restart Game
          </Text>
        </TouchableOpacity>

        {/* Back to Home dugme */}
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
          onPress={() => router.push("/")} // vodi na home page
        >
          <Text style={[styles.buttonText, { fontSize: 22 }]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const card = cards[currentIndex];

  const handleKnow = () => {
    markKnown();
    nextCardHandler();
    setShowTranslation(false);
  };

  const handleDontKnow = () => {
    setShowTranslation(true);
    setTimeout(() => {
      nextCardHandler();
      setShowTranslation(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {showTranslation ? card.answer : card.question}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f87171" }]}
          onPress={handleDontKnow}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#34d399" }]}
          onPress={handleKnow}
        >
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>Click the arrows below</Text>
      <Text style={styles.instruction}>Right = Know, Left = Don't know</Text>
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  score: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    width: width - 40,
    height: 250,
    backgroundColor: "#60a5fa",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 30,
  },
  cardText: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
  },
  instruction: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
  },
});
