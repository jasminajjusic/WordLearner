import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import ChoiceButton from "../../components/multiple_choice/choice_button";
import Progress from "../../components/multiple_choice/progress";
import ScoreBox from "../../components/multiple_choice/score_box";
import WordBox from "../../components/multiple_choice/word_box";
import { useGameStore } from "../stores/multipleChoiceStore";

import { styles } from "../../components/multiple_choice/game_styles";

export default function GameScreen() {
  const router = useRouter();
  const {
    current,
    choices,
    round,
    totalRounds,
    score,
    nextRound,
    fetchWords,
    loading,
  } = useGameStore();

  useEffect(() => {
    fetchWords("Bosnian", totalRounds);
  }, []);

  if (loading || !current) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34d399" />
      </SafeAreaView>
    );
  }

  function onChoose(choice: string) {
    if (!current) return;
    const correct = choice === current.correct;

    alert(`${correct ? "Correct!" : "Wrong"}\nAnswer: ${current.correct}`);

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
  }

  return (
    <SafeAreaView style={styles.container}>
      <Progress round={round} totalRounds={totalRounds} />
      <WordBox word={current.word} />
      <View style={styles.choices}>
        {choices.map((c, idx) => (
          <ChoiceButton
            key={`${c}-${idx}`}
            choice={c}
            onPress={() => onChoose(c)}
          />
        ))}
      </View>
      <ScoreBox score={score} />
    </SafeAreaView>
  );
}
