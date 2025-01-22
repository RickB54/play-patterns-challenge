import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import GameControls from "@/components/game/GameControls";

const Game = () => {
  const navigate = useNavigate();
  const { 
    difficulty: storedDifficulty, 
    usedTables, 
    addUsedTable, 
    setCurrentTable,
    playerCount,
    scores 
  } = useGameStore();
  
  const [showDifficulty, setShowDifficulty] = useState(!storedDifficulty);
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(null);
  const [allScoresEntered, setAllScoresEntered] = useState(false);

  const isPracticeMode = playerCount === 1;

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const allHaveScored = activePlayerScores.every(score => score > 0);
    setAllScoresEntered(allHaveScored);
  }, [scores, playerCount]);

  useEffect(() => {
    if (difficulty && !isPracticeMode) {
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
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      {isPracticeMode ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <PracticeMode 
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </div>
        </div>
      ) : (
        <>
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />

          <p className="mt-6 text-center text-sm">
            Setup the pool table as shown in the diagram then 'Enter Score' after each
            player's turn is over.
          </p>

          <GameControls 
            allScoresEntered={allScoresEntered}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            handleSelectTable={handleSelectTable}
          />
        </>
      )}

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