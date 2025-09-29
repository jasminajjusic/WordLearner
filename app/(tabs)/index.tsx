import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StartScreen() {
  const router = useRouter();

  const games = [
    {
      title: "Flashcards",
      color: "#f87171",
      icon: <FontAwesome5 name="book" size={32} color="white" />,
      onPress: () => router.push("/flashcards"), // sad vodi na screen
    },

    {
      title: "Translate",
      color: "#34d399",
      icon: <MaterialIcons name="translate" size={32} color="white" />,
      onPress: () => router.push("/translate"),
    },
    {
      title: "Multiple Choice",
      color: "#60a5fa",
      icon: <Entypo name="check" size={32} color="white" />,
      onPress: () => router.push("/game"),
    },
    {
      title: "Word Scramble",
      color: "#fbbf24",
      icon: <FontAwesome5 name="project-diagram" size={32} color="white" />,
      onPress: () => router.push("/wordScramble"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>WordLearner</Text>
      <Text style={styles.subheader}>Learn vocabulary with short quizzes</Text>
      <View style={styles.grid}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.title}
            style={[styles.box, { backgroundColor: game.color }]}
            onPress={game.onPress}
          >
            {game.icon}
            <Text style={styles.boxText}>{game.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "48%",
    height: 140,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  boxText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
});
