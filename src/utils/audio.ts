
class AudioManager {
  private static instance: AudioManager;
  private soundEnabled: boolean = true;
  private scoreSound: HTMLAudioElement;
  private timerSound: HTMLAudioElement;
  private stopClockAlarm: HTMLAudioElement;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.scoreSound = new Audio('/sounds/score.mp3');
      this.timerSound = new Audio('/sounds/timer.mp3');
      this.stopClockAlarm = new Audio('/stop-clock-alarm.wav');
      
      // Preload sounds
      this.stopClockAlarm.load();
      this.scoreSound.load();
      this.timerSound.load();
    }
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    console.log('Sound enabled:', enabled);
  }

  playScoreSound(): void {
    if (this.soundEnabled) {
      console.log('Playing score sound');
      this.scoreSound.play().catch(console.error);
    }
  }

  playTimerSound(): void {
    if (this.soundEnabled) {
      console.log('Playing timer sound');
      this.timerSound.play().catch(console.error);
    }
  }

  playStopClockAlarm(): void {
    if (this.soundEnabled) {
      console.log('Playing stop clock alarm');
      this.stopClockAlarm.currentTime = 0; // Reset the sound
      this.stopClockAlarm.play().catch(console.error);
    }
  }

  stopAlarm(): void {
    this.stopClockAlarm.pause();
    this.stopClockAlarm.currentTime = 0;
  }
}

export const audioManager = AudioManager.getInstance();
