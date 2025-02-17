
import { useState, useCallback, useEffect } from "react";
import DifficultySelector from "./DifficultySelector";
import PoolTableImage from "@/components/PoolTableImage";
import ShotClock from "@/components/game/ShotClock";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import { useShotClockStore } from "@/store/shotClockStore";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";

interface PracticeModeProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const PracticeMode = ({ difficulty, setDifficulty }: PracticeModeProps) => {
  const { usedTables, addUsedTable, setCurrentTable, currentTable } = useGameStore();
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const { setEnabled } = useShotClockStore();
  const [practiceScore, setPracticeScore] = useState(0);

  // Enable shot clock when practice mode mounts
  useEffect(() => {
    setEnabled(true);
    return () => setEnabled(false); // Disable when unmounting
  }, [setEnabled]);

  const handleSelectTable = useCallback(() => {
    if (difficulty) {
      console.log("Selecting new table with difficulty:", difficulty);
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      console.log("New table selected:", newTable);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      // Reset score when selecting a new table
      setPracticeScore(0);
    }
  }, [difficulty, usedTables, addUsedTable, setCurrentTable]);

  const handleScoreChange = (increment: boolean) => {
    setPracticeScore(prev => increment ? prev + 1 : Math.max(0, prev - 1));
  };

  return (
    <div className="flex flex-col gap-6">
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      
      {difficulty && (
        <>
          <button 
            onClick={handleSelectTable} 
            className="w-full btn-secondary"
          >
            Select Table
          </button>

          {currentTableLocal && (
            <>
              <PoolTableImage 
                currentTable={currentTableLocal} 
                setCurrentTableLocal={setCurrentTableLocal}
              />
              
              <div className="grid grid-cols-1 gap-3">
                <Card className="p-4 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-base font-medium text-purple-200">Practice Score</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleScoreChange(false)}
                        className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                      >
                        <Minus className="w-5 h-5 text-[#D6BCFA]" />
                      </button>
                      <span className="text-xl font-bold min-w-[2ch] text-center text-white">
                        {practiceScore}
                      </span>
                      <button
                        onClick={() => handleScoreChange(true)}
                        className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                      >
                        <Plus className="w-5 h-5 text-[#D6BCFA]" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </>
      )}

      <ShotClock />
    </div>
  );
};

export default PracticeMode;
