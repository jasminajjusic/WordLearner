import { create } from "zustand";

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsState {
  cards: Flashcard[];
  currentIndex: number;
  score: number; // broj kartica koje korisnik zna
  nextCard: () => void;
  markKnown: () => void; // nova funkcija
  resetGame: () => void;
}

export const useFlashcardsStore = create<FlashcardsState>((set) => ({
  cards: [
    { question: "Dog", answer: "Pas" },
    { question: "Cat", answer: "Mačka" },
    { question: "House", answer: "Kuća" },
  ],
  currentIndex: 0,
  score: 0,
  nextCard: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1, // uvijek povećavamo, čak i nakon zadnje kartice
    })),
  markKnown: () =>
    set((state) => ({
      score: state.score + 1,
    })),
  resetGame: () => set({ currentIndex: 0, score: 0 }),
}));
