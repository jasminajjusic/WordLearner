import { create } from "zustand";

interface Card {
  question: string;
  answer: string;
}

interface TranslateState {
  cards: Card[];
  currentIndex: number;
  score: number;
  loading: boolean;
  fetchWords: (language?: string, count?: number) => Promise<void>;
  nextCard: () => void;
  markCorrect: () => void;
  resetGame: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  cards: [],
  currentIndex: 0,
  score: 0,
  loading: false,

  fetchWords: async (language = "Bosnian", count = 5) => {
    set({ loading: true });
    try {
      const res = await fetch("http://192.168.1.10:3000/generate-words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, count }),
      });

      const data = await res.json();
      set({
        cards: data.words || [],
        currentIndex: 0,
        score: 0,
        loading: false,
      });
    } catch (e) {
      console.error("Error fetching words:", e);
      set({ loading: false });
    }
  },

  nextCard: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
  markCorrect: () =>
    set((state) => ({
      score: state.score + 1,
    })),
  resetGame: () => set({ currentIndex: 0, score: 0 }),
}));
