import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Start" }} />
      <Stack.Screen name="game" options={{ title: "Game" }} />
      <Stack.Screen name="score" options={{ title: "Score" }} />
    </Stack>
  );
}
