import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTranslateStore } from "../stores/translateStore";

import GameOverCard from "../../components/game_over_card";

import TranslateCard from "../../components/translate_card";

export default function TranslateScreen() {
  const router = useRouter();
  const {
    cards,
    currentIndex,
    score,
    loading,
    fetchWords,
    nextCard,
    markCorrect,
    resetGame,
  } = useTranslateStore();

  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchWords("Bosnian", 5);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#34d399" />
      </View>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <GameOverCard
        score={score}
        total={cards.length}
        onRestart={() => {
          resetGame();
          fetchWords("Bosnian", 5);
          setInput("");
        }}
        onHome={() => router.push("/")}
      />
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
      }, 1000);
    }
  };

  return (
    <TranslateCard
      word={card.question}
      answer={card.answer}
      input={input}
      showAnswer={showAnswer}
      onChangeText={setInput}
      onSubmit={handleSubmit}
    />
  );
}
