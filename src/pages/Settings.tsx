import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RulesDialog } from "@/components/RulesDialog";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEndRound = () => {
    toast({
      title: "Round Ended",
      description: "Returning to home page",
    });
    navigate("/");
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1">Settings</h1>
      </div>

      <Card className="p-6 glass-card space-y-4">
        <RulesDialog>
          <button className="w-full btn-secondary">Rules of the Game</button>
        </RulesDialog>
        
        <button onClick={() => navigate("/game")} className="w-full btn-secondary">
          Start New Round
        </button>
        
        <button onClick={() => navigate("/score")} className="w-full btn-secondary">
          See Score
        </button>
        
        <button onClick={() => navigate("/game")} className="w-full btn-secondary">
          Practice a Table
        </button>
        
        <button onClick={handleEndRound} className="w-full btn-destructive">
          End Round
        </button>
      </Card>
    </div>
  );
};

export default Settings;