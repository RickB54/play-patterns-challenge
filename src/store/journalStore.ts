
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
  title: string;
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, updates: Partial<JournalEntry>) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({
        entries: [
          {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            ...entry,
          },
          ...state.entries,
        ],
      })),
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),
      editEntry: (id, updates) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? { ...entry, ...updates } : entry
        ),
      })),
    }),
    {
      name: 'journal-storage',
    }
  )
);
