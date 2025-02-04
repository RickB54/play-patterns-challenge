import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShotClockState {
  enabled: boolean;
  duration: number;
  setEnabled: (enabled: boolean) => void;
  setDuration: (duration: number) => void;
}

export const useShotClockStore = create<ShotClockState>()(
  persist(
    (set) => ({
      enabled: false,
      duration: 60,
      setEnabled: (enabled) => set({ enabled }),
      setDuration: (duration) => set({ duration }),
    }),
    {
      name: 'shot-clock-storage'
    }
  )
);