import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import { useToast } from "@/hooks/use-toast";

const Game = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { difficulty: storedDifficulty, usedTables, addUsedTable, setCurrentTable } = useGameStore();
  const [showDifficulty, setShowDifficulty] = useState(!storedDifficulty);
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTable, setCurrentTableLocal] = useState<string | null>(null);

  useEffect(() => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
    }
  }, [difficulty]);

  const handleSelectTable = () => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      toast({
        title: "New Table Selected",
        description: `Difficulty: ${difficulty}`,
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <Card className="p-4 glass-card">
        <img
          src={currentTable || "/placeholder.svg"}
          alt="Pool Table Setup"
          className="w-full h-auto rounded-lg"
        />
      </Card>

      <p className="mt-6 text-center text-sm">
        Setup the pool table as shown in the diagram then 'Enter Score' after each
        player's turn is over.
      </p>

      <button onClick={() => navigate("/score")} className="mt-6 btn-primary">
        Enter Score
      </button>

      {showDifficulty && (
        <div className="mt-6 space-y-4">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <button 
            onClick={handleSelectTable} 
            className="w-full btn-secondary"
            disabled={!difficulty}
          >
            Select Table
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Click the Settings Icon below to Start a new round or to set other
        preferences.
      </p>

      <button
        onClick={() => navigate("/settings")}
        className="mt-auto mx-auto p-4"
      >
        <Settings className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Game;