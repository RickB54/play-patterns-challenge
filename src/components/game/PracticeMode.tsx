import { useState, useCallback } from "react";
import DifficultySelector from "./DifficultySelector";
import PoolTableImage from "@/components/PoolTableImage";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";

interface PracticeModeProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const PracticeMode = ({ difficulty, setDifficulty }: PracticeModeProps) => {
  const { usedTables, addUsedTable, setCurrentTable } = useGameStore();
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(null);

  const handleSelectTable = useCallback(() => {
    if (difficulty) {
      console.log("Selecting new table with difficulty:", difficulty);
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      console.log("New table selected:", newTable);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
    }
  }, [difficulty, usedTables, addUsedTable, setCurrentTable]);

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
            <PoolTableImage 
              currentTable={currentTableLocal} 
              setCurrentTableLocal={setCurrentTableLocal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PracticeMode;