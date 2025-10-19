import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TranslateCardProps {
  word: string;
  answer: string;
  input: string;
  showAnswer: boolean;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TranslateCard: React.FC<TranslateCardProps> = ({
  word,
  answer,
  input,
  showAnswer,
  onChangeText,
  onSubmit,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Translate the word:</Text>

    <View style={styles.card}>
      <Text style={styles.word}>{word}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter translation"
        value={input}
        onChangeText={onChangeText}
      />
      {showAnswer && <Text style={styles.translation}>Correct: {answer}</Text>}
    </View>

    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#34d399" }]}
      onPress={onSubmit}
    >
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    color: "#111827",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: "center",
  },
  word: { fontSize: 36, fontWeight: "700", color: "#1f2937", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: "#f9fafb",
    marginBottom: 15,
  },
  translation: { fontSize: 18, color: "#ef4444", fontWeight: "600" },
  button: {
    width: "60%",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "700" },
});
