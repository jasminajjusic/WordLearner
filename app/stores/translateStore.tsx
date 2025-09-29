import { create } from "zustand";

interface Card {
  question: string; // riječ na engleskom
  answer: string; // prijevod na drugom jeziku
}

interface TranslateState {
  cards: Card[];
  currentIndex: number;
  score: number;
  nextCard: () => void;
  markCorrect: () => void;
  resetGame: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  cards: [
    { question: "Dog", answer: "Pas" },
    { question: "Cat", answer: "Mačka" },
    { question: "House", answer: "Kuća" },
  ],
  currentIndex: 0,
  score: 0,
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
