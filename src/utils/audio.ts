
class AudioManager {
  private static instance: AudioManager;
  private soundEnabled: boolean = false;
  private scoreSound: HTMLAudioElement;
  private timerSound: HTMLAudioElement;
  private stopClockAlarm: HTMLAudioElement;

  private constructor() {
    this.scoreSound = new Audio('/sounds/score.mp3');
    this.timerSound = new Audio('/sounds/timer.mp3');
    this.stopClockAlarm = new Audio('/stop-clock-alarm.wav');
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
  }

  playScoreSound(): void {
    if (this.soundEnabled) {
      this.scoreSound.play().catch(console.error);
    }
  }

  playTimerSound(): void {
    if (this.soundEnabled) {
      this.timerSound.play().catch(console.error);
    }
  }

  playStopClockAlarm(): void {
    if (this.soundEnabled) {
      this.stopClockAlarm.play().catch(console.error);
    }
  }
}

export const audioManager = AudioManager.getInstance();
