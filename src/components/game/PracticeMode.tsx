import { useState } from "react";
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

  const handleSelectTable = () => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium">Level of Difficulty</label>
        <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      </div>
      
      {difficulty && (
        <button 
          onClick={handleSelectTable} 
          className="w-full btn-secondary"
        >
          Select Table
        </button>
      )}

      {currentTableLocal && (
        <PoolTableImage 
          currentTable={currentTableLocal} 
          setCurrentTableLocal={setCurrentTableLocal}
        />
      )}
    </div>
  );
};

export default PracticeMode;