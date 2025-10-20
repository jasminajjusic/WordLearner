import { create } from "zustand";

interface Word {
  word: string;
  correct: string;
}

interface WordScrambleState {
  words: Word[];
  currentIndex: number;
  score: number;
  loading: boolean;
  fetchWords: (language?: string, count?: number) => Promise<void>;
  nextWord: () => void;
  markCorrect: () => void;
  resetGame: () => void;
}

export const useWordScrambleStore = create<WordScrambleState>((set, get) => ({
  words: [],
  currentIndex: 0,
  score: 0,
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

      const words: Word[] = (data.words || []).map((w: any) => ({
        word: w.question,
        correct: w.answer,
      }));

      set({
        words,
        currentIndex: 0,
        score: 0,
        loading: false,
      });
    } catch (e) {
      console.error("Error fetching words:", e);
      set({ loading: false });
    }
  },

  nextWord: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  markCorrect: () => set((state) => ({ score: state.score + 1 })),
  resetGame: () => set({ currentIndex: 0, score: 0, words: [] }),
}));
