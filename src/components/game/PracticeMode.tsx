
import { useState, useCallback, useEffect } from "react";
import DifficultySelector from "./DifficultySelector";
import PoolTableImage from "@/components/PoolTableImage";
import ShotClock from "@/components/game/ShotClock";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import { useShotClockStore } from "@/store/shotClockStore";

interface PracticeModeProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const PracticeMode = ({ difficulty, setDifficulty }: PracticeModeProps) => {
  const { usedTables, addUsedTable, setCurrentTable, currentTable } = useGameStore();
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const { setEnabled } = useShotClockStore();

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

      <ShotClock />
    </div>
  );
};

export default PracticeMode;
