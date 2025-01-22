import { useState, useEffect } from "react";
import DifficultySelector from "./DifficultySelector";
import PoolTableImage from "@/components/PoolTableImage";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";

interface PracticeModeProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const PracticeMode = ({ difficulty, setDifficulty }: PracticeModeProps) => {
  const { usedTables, addUsedTable, setCurrentTable, currentTable } = useGameStore();
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);

  useEffect(() => {
    if (currentTable) {
      setCurrentTableLocal(currentTable);
      console.log("Current table updated in PracticeMode:", currentTable);
    }
  }, [currentTable]);

  const handleSelectTable = () => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      console.log("Selected new table:", newTable);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
    }
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

          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
        </>
      )}
    </div>
  );
};

export default PracticeMode;