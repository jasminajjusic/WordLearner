import React from "react";
import { Text, View } from "react-native";
import { styles } from "./game_styles";

interface Props {
  score: number;
}

export default function ScoreBox({ score }: Props) {
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
}
