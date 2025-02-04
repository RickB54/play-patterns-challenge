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
  getAveragePoints: (period: 'all' | 'daily' | 'weekly' | 'monthly') => number;
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({
        entries: [...state.entries, entry]
      })),
      getAveragePoints: (period) => {
        const entries = get().entries;
        if (entries.length === 0) return 0;

        const now = new Date();
        const filteredEntries = entries.filter(entry => {
          const entryDate = new Date(entry.date);
          switch (period) {
            case 'daily':
              return entryDate.toDateString() === now.toDateString();
            case 'weekly':
              const weekAgo = new Date(now.setDate(now.getDate() - 7));
              return entryDate >= weekAgo;
            case 'monthly':
              const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
              return entryDate >= monthAgo;
            default:
              return true;
          }
        });

        return filteredEntries.reduce((acc, curr) => acc + curr.averagePoints, 0) / filteredEntries.length;
      }
    }),
    {
      name: 'progression-storage'
    }
  )
);