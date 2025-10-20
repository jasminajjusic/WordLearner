import { create } from "zustand";

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsState {
  cards: Flashcard[];
  currentIndex: number;
  score: number;
  loading: boolean;
  fetchCards: (language?: string, count?: number) => Promise<void>;
  nextCard: () => void;
  markCorrect: () => void;
  resetGame: () => void;
}

export const useFlashcardsStore = create<FlashcardsState>((set) => ({
  cards: [],
  currentIndex: 0,
  score: 0,
  loading: false,

  fetchCards: async (language = "Bosnian", count = 5) => {
    set({ loading: true });
    try {
      const res = await fetch("http://192.168.1.3:3000/generate-words", {
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
      console.error("Error fetching flashcards:", e);
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
