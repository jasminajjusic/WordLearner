import { create } from "zustand";

interface Word {
  id: number;
  word: string; 
}

interface WordScrambleState {
  words: Word[];
  currentIndex: number;
  score: number;
  nextWord: () => void;
  markCorrect: () => void;
  resetGame: () => void;
}

export const useWordScrambleStore = create<WordScrambleState>((set, get) => ({
  words: [
    { id: 1, word: "Dog" },
    { id: 2, word: "Cat" },
    { id: 3, word: "House" },
    { id: 4, word: "Apple" },
  ],
  currentIndex: 0,
  score: 0,
  nextWord: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
  markCorrect: () =>
    set((state) => ({
      score: get().score + 1,
    })),
  resetGame: () =>
    set({
      currentIndex: 0,
      score: 0,
    }),
}));
