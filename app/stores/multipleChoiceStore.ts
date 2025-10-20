import { create } from "zustand";

export interface Word {
  word: string;
  correct: string;
}

interface GameState {
  pool: Word[];
  round: number;
  score: number;
  totalRounds: number;
  current: Word | null;
  choices: string[];
  loading: boolean;
  fetchWords: (language?: string, count?: number) => Promise<void>;
  nextRound: (correct: boolean) => void;
  resetGame: () => void;
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const useGameStore = create<GameState>((set, get) => ({
  pool: [],
  round: 0,
  score: 0,
  totalRounds: 8,
  current: null,
  choices: [],
  loading: false,

  fetchWords: async (language = "Bosnian", count = 8) => {
    set({ loading: true });

    try {
      const res = await fetch("http://192.168.1.3:3000/generate-words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, count }),
      });

      const data = await res.json();

      const pool: Word[] = (data.words || []).map((w: any) => ({
        word: w.question,
        correct: w.answer,
      }));

      const getChoices = (roundIndex: number) => {
        if (!pool.length) return [];
        const currentWord = pool[roundIndex % pool.length];
        const others = shuffle(
          pool.filter((w) => w.correct !== currentWord.correct)
        )
          .slice(0, 3)
          .map((w) => w.correct);
        return shuffle([currentWord.correct, ...others]);
      };

      set({
        pool,
        round: 0,
        score: 0,
        current: pool[0] || null,
        choices: getChoices(0),
        loading: false,
      });
    } catch (e) {
      set({ loading: false });
    }
  },

  nextRound: (correct: boolean) => {
    const { round, pool, totalRounds, score } = get();
    const nextRoundIndex = round + 1;

    const currentWord =
      nextRoundIndex < totalRounds ? pool[nextRoundIndex] : pool[round];

    const getChoices = (roundIndex: number) => {
      if (!pool.length) return [];
      const currentWord = pool[roundIndex % pool.length];
      const others = shuffle(
        pool.filter((w) => w.correct !== currentWord.correct)
      )
        .slice(0, 3)
        .map((w) => w.correct);
      return shuffle([currentWord.correct, ...others]);
    };

    set({
      round: nextRoundIndex,
      score: correct ? score + 1 : score,
      current: currentWord,
      choices: getChoices(nextRoundIndex),
    });
  },

  resetGame: () => {
    const { pool } = get();

    const getChoices = (roundIndex: number) => {
      if (!pool.length) return [];
      const currentWord = pool[roundIndex % pool.length];
      const others = shuffle(
        pool.filter((w) => w.correct !== currentWord.correct)
      )
        .slice(0, 3)
        .map((w) => w.correct);
      return shuffle([currentWord.correct, ...others]);
    };

    set({
      round: 0,
      score: 0,
      current: pool[0] || null,
      choices: getChoices(0),
    });
  },
}));
