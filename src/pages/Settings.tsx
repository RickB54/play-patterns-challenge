import { ArrowLeft, Timer, ChartLine, Volume2, VolumeX, Maximize, Trophy, BookText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { RulesDialog } from "@/components/RulesDialog";
import { useToast } from "@/components/ui/use-toast";
import { useGameStore } from "@/store/gameStore";
import { useShotClockStore } from "@/store/shotClockStore";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetGame, playerCount, scores } = useGameStore();
  const { enabled, setEnabled, duration, setDuration, soundEnabled, setSoundEnabled } = useShotClockStore();
  const [customTime, setCustomTime] = useState(duration.toString());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleEndGame = () => {
    toast({
      title: "Game Ended",
      description: "Redirecting to Winner's Circle",
    });
    navigate("/winners-circle");
  };

  const handleDurationChange = (value: string) => {
    if (value === "custom") return;
    setDuration(parseInt(value));
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTime(value);
    if (value && !isNaN(parseInt(value))) {
      setDuration(parseInt(value));
    }
  };

  const hasScores = scores.slice(0, playerCount).some(score => score > 0);

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="w-10" />
      </div>

      <Card className="p-4 space-y-4 glass-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Maximize className="w-5 h-5" />
              <Label htmlFor="fullscreen">Fullscreen Mode</Label>
            </div>
            <Switch
              id="fullscreen"
              checked={isFullscreen}
              onCheckedChange={toggleFullscreen}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5" />
              <Label htmlFor="shot-clock">Shot Clock</Label>
            </div>
            <Switch
              id="shot-clock"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {enabled && (
            <div className="pl-7 space-y-4 animate-fadeIn">
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

              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                  <Label htmlFor="sound">Sound Effects</Label>
                </div>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => navigate("/progression")} 
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <ChartLine className="w-5 h-5" />
          Progression Tracker
        </button>

        <button 
          onClick={() => navigate("/awards")} 
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          View Awards
        </button>

        <button 
          onClick={() => navigate("/journal")} 
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <BookText className="w-5 h-5" />
          Journal
        </button>

        <RulesDialog>
          <button className="w-full btn-secondary">Rules of the Game</button>
        </RulesDialog>

        <button 
          onClick={() => navigate("/setup", { state: { newRound: true } })} 
          className="w-full btn-secondary"
        >
          Start New Round
        </button>

        {hasScores && (
          <button 
            onClick={() => navigate("/winners-circle")} 
            className="w-full btn-secondary"
          >
            View Winner's Circle
          </button>
        )}
        
        <button onClick={handleEndGame} className="w-full btn-destructive">
          End Game
        </button>
      </Card>
    </div>
  );
};

export default Settings;
