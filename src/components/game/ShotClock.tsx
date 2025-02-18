
import { useState, useEffect, useRef } from "react";
import { Timer, X } from "lucide-react";
import { useShotClockStore } from "@/store/shotClockStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { audioManager } from "@/utils/audio";

const ShotClock = () => {
  const { enabled, duration, setEnabled, setDuration, soundEnabled } = useShotClockStore();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(duration.toString());
  const alarmSound = useRef(new Audio('/stop-clock-alarm.wav'));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1 && soundEnabled) {
            alarmSound.current.play().catch(console.error);
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, soundEnabled]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (value: string) => {
    if (value === "custom") return;
    setDuration(parseInt(value));
    setTimeLeft(parseInt(value));
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTime(value);
    if (value && !isNaN(parseInt(value))) {
      setDuration(parseInt(value));
      setTimeLeft(parseInt(value));
    }
  };

  if (!enabled) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex justify-center items-center gap-4">
        <div className="text-2xl font-bold bg-background/80 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 bg-primary rounded-full shadow-lg">
              <Timer className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shot Clock Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <RadioGroup
                value={duration.toString()}
                onValueChange={handleDurationChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30" id="30" />
                  <Label htmlFor="30">30 seconds</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="60" />
                  <Label htmlFor="60">60 seconds</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom</Label>
                  <Input
                    type="number"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    className="w-20"
                    min="1"
                  />
                </div>
              </RadioGroup>
              
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  {!isRunning ? (
                    <button
                      onClick={handleStart}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded"
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      onClick={handleStop}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded"
                    >
                      Stop
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShotClock;
