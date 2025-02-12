
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShotClockState {
  enabled: boolean;
  duration: number;
  soundEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  setDuration: (duration: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useShotClockStore = create<ShotClockState>()(
  persist(
    (set) => ({
      enabled: false,
      duration: 60,
      soundEnabled: false,
      setEnabled: (enabled) => set({ enabled }),
      setDuration: (duration) => set({ duration }),
      setSoundEnabled: (enabled) => set({ soundEnabled }),
    }),
    {
      name: 'shot-clock-storage'
    }
  )
);
