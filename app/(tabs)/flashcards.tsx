import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFlashcardsStore } from "../stores/flashcardsStore";

import Card from "../../components/flashcards/card";
import FlashcardButtons from "../../components/flashcards/flashcard_buttons";
import GameOverCard from "../../components/flashcards/game_over_card";

export default function FlashcardsScreen() {
  const router = useRouter();
  const {
    cards,
    currentIndex,
    nextCard,
    markCorrect,
    resetGame,
    score,
    loading,
    fetchCards,
  } = useFlashcardsStore();

  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    fetchCards("Bosnian", 5);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#34d399" />
        <Text style={{ marginTop: 20, fontSize: 18 }}>
          Loading flashcards...
        </Text>
      </View>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <View style={styles.container}>
        <GameOverCard
          score={score}
          total={cards.length}
          onRestart={() => {
            resetGame();
            fetchCards("Bosnian", 5);
          }}
          onHome={() => router.push("/")}
        />
      </View>
    );
  }

  const card = cards[currentIndex];

  const handleKnow = () => {
    markCorrect();
    nextCard();
    setShowTranslation(false);
  };

  const handleDontKnow = () => {
    setShowTranslation(true);
    setTimeout(() => {
      nextCard();
      setShowTranslation(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Card text={showTranslation ? card.answer : card.question} />
      <FlashcardButtons onKnow={handleKnow} onDontKnow={handleDontKnow} />
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
  instruction: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});
