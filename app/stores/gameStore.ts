import { create } from "zustand";

type Word = { word: string; correct: string };

const WORDS: Word[] = [
  { word: "sunce", correct: "sun" },
  { word: "voda", correct: "water" },
  { word: "kuća", correct: "house" },
  { word: "pas", correct: "dog" },
  { word: "mačka", correct: "cat" },
  { word: "knjiga", correct: "book" },
  { word: "stolica", correct: "chair" },
  { word: "hrana", correct: "food" },
  { word: "auto", correct: "car" },
  { word: "škola", correct: "school" },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

type GameState = {
  pool: Word[];
  round: number;
  score: number;
  totalRounds: number;
  current: Word;
  choices: string[];
  nextRound: (correct: boolean) => void;
};

export const useGameStore = create<GameState>((set, get) => {
  const pool = shuffle(WORDS);
  const totalRounds = 8;
  const current = pool[0];

  function getChoices(round: number) {
    const currentWord = pool[round % pool.length];
    const others = shuffle(
      WORDS.filter((w) => w.correct !== currentWord.correct)
    )
      .slice(0, 3)
      .map((w) => w.correct);
    return shuffle([currentWord.correct, ...others]);
  }

  return {
    pool,
    round: 0,
    score: 0,
    totalRounds,
    current,
    choices: getChoices(0),

    nextRound: (correct: boolean) => {
      set((state) => ({
        round: state.round + 1,
        score: correct ? state.score + 1 : state.score,
        current:
          state.pool[
            state.round + 1 < state.totalRounds ? state.round + 1 : state.round
          ],
        choices: getChoices(state.round + 1),
      }));
    },
  };
});
