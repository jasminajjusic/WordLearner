import React from "react";
import { Text, View } from "react-native";
import { styles } from "./game_styles";

interface Props {
  word: string;
}

export default function WordBox({ word }: Props) {
  return (
    <View style={styles.wordBox}>
      <Text style={styles.word}>{word}</Text>
    </View>
  );
}
