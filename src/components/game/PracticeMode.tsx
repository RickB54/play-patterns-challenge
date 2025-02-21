
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DifficultySelector from "./DifficultySelector";
import PoolTableImage from "@/components/PoolTableImage";
import ShotClock from "@/components/game/ShotClock";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import { useShotClockStore } from "@/store/shotClockStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type Difficulty = "easy" | "intermediate" | "advanced" | "expert";

interface PracticeModeProps {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  currentRound: number;
  onIncrementRound: () => void;
}

const PracticeMode = ({ 
  difficulty, 
  setDifficulty,
  currentRound,
  onIncrementRound
}: PracticeModeProps) => {
  const navigate = useNavigate();
  const { usedTables, addUsedTable, setCurrentTable, currentTable } = useGameStore();
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const { setEnabled } = useShotClockStore();
  const [practiceScore, setPracticeScore] = useState(0);

  useEffect(() => {
    setEnabled(true);
    return () => setEnabled(false);
  }, [setEnabled]);

  const handleSelectTable = useCallback(() => {
    navigate("/skill-levels?practice=true");
  }, [navigate]);

  const handleScoreChange = (increment: boolean) => {
    setPracticeScore(prev => increment ? prev + 1 : Math.max(0, prev - 1));
  };

  return (
    <div className="flex flex-col gap-6">
      <DifficultySelector 
        difficulty={difficulty} 
        setDifficulty={(value: string) => setDifficulty(value as Difficulty)} 
      />
      
      <Button 
        onClick={handleSelectTable} 
        className="w-full"
      >
        Start Practice
      </Button>

      {currentTableLocal && (
        <>
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
          
          <Card className="p-4 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-lg font-medium text-purple-200">Practice Score</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleScoreChange(false)}
                  className="p-2 rounded-full hover:bg-[#6E59A5]/30 transition-colors"
                >
                  <Minus className="w-6 h-6 text-[#D6BCFA]" />
                </button>
                <span className="text-2xl font-bold min-w-[3ch] text-center text-white">
                  {practiceScore}
                </span>
                <button
                  onClick={() => handleScoreChange(true)}
                  className="p-2 rounded-full hover:bg-[#6E59A5]/30 transition-colors"
                >
                  <Plus className="w-6 h-6 text-[#D6BCFA]" />
                </button>
              </div>
            </div>
          </Card>
          
          <ShotClock />
        </>
      )}
    </div>
  );
};

export default PracticeMode;
