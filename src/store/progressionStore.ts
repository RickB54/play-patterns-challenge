
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AwardType {
  id: string;
  name: string;
  description: string;
  date: string;
  playerId: string;
}

export interface ProgressionEntry {
  date: string;
  points: number;
  skillLevels: string[];
  roundsPlayed: number;
  averagePoints: number;
  playerName: string;
  awards?: AwardType[];
}

interface ProgressionState {
  entries: ProgressionEntry[];
  addEntry: (entry: ProgressionEntry) => void;
  clearAllData: () => void;
  addAward: (playerId: string, award: AwardType) => void;
}

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({
        entries: [entry, ...state.entries]
      })),
      clearAllData: () => set({ entries: [] }),
      addAward: (playerId, award) => set((state) => ({
        entries: state.entries.map(entry =>
          entry.playerName === playerId
            ? {
                ...entry,
                awards: [...(entry.awards || []), award]
              }
            : entry
        )
      })),
    }),
    {
      name: 'progression-storage'
    }
  )
);
