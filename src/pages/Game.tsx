import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import DifficultySelector from "@/components/game/DifficultySelector";

const Game = () => {
  const navigate = useNavigate();
  const { 
    difficulty: storedDifficulty, 
    usedTables, 
    addUsedTable, 
    setCurrentTable,
    playerCount,
    scores,
    currentTable 
  } = useGameStore();
  
  const [showDifficulty, setShowDifficulty] = useState(!storedDifficulty);
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const [allScoresEntered, setAllScoresEntered] = useState(false);

  const isPracticeMode = window.location.search.includes('practice=true');

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const allHaveScored = activePlayerScores.every(score => score > 0);
    setAllScoresEntered(allHaveScored);
  }, [scores, playerCount]);

  useEffect(() => {
    // If there's a currentTable in the store but not locally, set it
    if (currentTable && !currentTableLocal) {
      setCurrentTableLocal(currentTable);
    }
  }, [currentTable]);

  const handleSelectTable = () => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
    }
  };

  if (isPracticeMode) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex flex-col gap-6">
          <PracticeMode 
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="mt-auto mx-auto p-4"
        >
          <Settings className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex flex-col gap-6">
        {currentTableLocal && (
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
        )}
        
        <div className="space-y-4">
          <button onClick={() => navigate("/score")} className="w-full btn-primary">
            Enter Score
          </button>

          {!currentTableLocal && (
            <>
              <DifficultySelector 
                difficulty={difficulty} 
                setDifficulty={setDifficulty} 
              />
              
              <button 
                onClick={handleSelectTable} 
                className="w-full btn-secondary"
                disabled={!difficulty}
              >
                Select Table
              </button>
            </>
          )}
        </div>
      </div>

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