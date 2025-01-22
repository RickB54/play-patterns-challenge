import { create } from 'zustand';

interface GameState {
  playerCount: number;
  playerNames: string[];
  scores: number[];
  difficulty: string;
  usedTables: {
    easy: string[];
    intermediate: string[];
    advanced: string[];
    expert: string[];
  };
  currentTable: string | null;
  setPlayerCount: (count: number) => void;
  setPlayerNames: (names: string[]) => void;
  updateScore: (playerIndex: number, score: number) => void;
  setDifficulty: (difficulty: string) => void;
  resetGame: () => void;
  addUsedTable: (difficulty: string, tableUrl: string) => void;
  resetUsedTables: (difficulty: string) => void;
  setCurrentTable: (tableUrl: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerCount: 2,
  playerNames: Array(8).fill('').map((_, i) => `Player ${i + 1}`),
  scores: Array(8).fill(0),
  difficulty: '',
  currentTable: null,
  usedTables: {
    easy: [],
    intermediate: [],
    advanced: [],
    expert: [],
  },
  setPlayerCount: (count) => set({ playerCount: count }),
  setPlayerNames: (names) => set({ playerNames: names }),
  updateScore: (playerIndex, score) => 
    set((state) => {
      const newScores = [...state.scores];
      newScores[playerIndex] = score;
      return { scores: newScores };
    }),
  setDifficulty: (difficulty) => set({ difficulty }),
  resetGame: () => set({ 
    playerCount: 2,
    playerNames: Array(8).fill('').map((_, i) => `Player ${i + 1}`),
    scores: Array(8).fill(0),
    difficulty: '',
    usedTables: {
      easy: [],
      intermediate: [],
      advanced: [],
      expert: [],
    },
    currentTable: null,
  }),
  addUsedTable: (difficulty, tableUrl) =>
    set((state) => ({
      usedTables: {
        ...state.usedTables,
        [difficulty.toLowerCase()]: [...state.usedTables[difficulty.toLowerCase() as keyof typeof state.usedTables], tableUrl]
      }
    })),
  resetUsedTables: (difficulty) =>
    set((state) => ({
      usedTables: {
        ...state.usedTables,
        [difficulty.toLowerCase()]: []
      }
    })),
  setCurrentTable: (tableUrl) => set({ currentTable: tableUrl }),
}));