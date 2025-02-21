
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { audioManager } from '@/utils/audio';

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
      soundEnabled: true,
      setEnabled: (enabled) => set({ enabled }),
      setDuration: (duration) => set({ duration }),
      setSoundEnabled: (enabled) => {
        audioManager.setSoundEnabled(enabled);
        set({ soundEnabled: enabled });
      },
    }),
    {
      name: 'shot-clock-storage'
    }
  )
);
