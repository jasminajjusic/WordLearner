import React from "react";
import { Text } from "react-native";
import { styles } from "./game_styles";

interface Props {
  round: number;
  totalRounds: number;
}

export default function Progress({ round, totalRounds }: Props) {
  return (
    <Text style={styles.progress}>
      Round {round + 1} / {totalRounds}
    </Text>
  );
}
