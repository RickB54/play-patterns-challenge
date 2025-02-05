import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProgressionEntry {
  date: string;
  points: number;
  skillLevels: string[];
  roundsPlayed: number;
  averagePoints: number;
}

interface ProgressionState {
  entries: ProgressionEntry[];
  addEntry: (entry: ProgressionEntry) => void;
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({
        entries: [entry, ...state.entries]
      })),
    }),
    {
      name: 'progression-storage'
    }
  )
);