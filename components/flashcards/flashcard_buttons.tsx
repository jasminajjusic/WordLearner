import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onKnow: () => void;
  onDontKnow: () => void;
}

export default function FlashcardButtons({ onKnow, onDontKnow }: Props) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#f87171" }]}
        onPress={onDontKnow}
      >
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#34d399" }]}
        onPress={onKnow}
      >
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
  },
});
