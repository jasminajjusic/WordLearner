import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./game_styles";

interface Props {
  choice: string;
  onPress: () => void;
}

export default function ChoiceButton({ choice, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.choice} onPress={onPress}>
      <Text style={styles.choiceText}>{choice}</Text>
    </TouchableOpacity>
  );
}
