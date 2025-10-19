import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface CardProps {
  text: string;
}

export default function Card({ text }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
