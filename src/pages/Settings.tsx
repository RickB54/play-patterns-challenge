import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { RulesDialog } from "@/components/RulesDialog";
import { useToast } from "@/components/ui/use-toast";
import { useGameStore } from "@/store/gameStore";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetGame } = useGameStore();

  const handleEndGame = () => {
    resetGame();
    toast({
      title: "Game Ended",
      description: "Returning to home page",
    });
    navigate("/");
  };

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
        <RulesDialog>
          <button className="w-full btn-secondary">Rules of the Game</button>
        </RulesDialog>

        <button 
          onClick={() => navigate("/setup", { state: { newRound: true } })} 
          className="w-full btn-secondary"
        >
          Start New Round
        </button>

        <button onClick={() => navigate("/score")} className="w-full btn-secondary">
          See Score
        </button>

        <button onClick={() => navigate("/game")} className="w-full btn-secondary">
          Practice a Table
        </button>
        
        <button onClick={handleEndGame} className="w-full btn-destructive">
          End Game
        </button>
      </Card>
    </div>
  );
};

export default Settings;