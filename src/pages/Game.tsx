import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import GameControls from "@/components/game/GameControls";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Game = () => {
  const navigate = useNavigate();
  const { 
    difficulty: storedDifficulty, 
    usedTables, 
    addUsedTable, 
    setCurrentTable,
    playerCount,
    scores,
    currentTable,
    currentRound,
    maxRounds,
    incrementRound
  } = useGameStore();
  
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const [allScoresEntered, setAllScoresEntered] = useState(false);
  const [showRoundsDialog, setShowRoundsDialog] = useState(false);

  const isPracticeMode = window.location.search.includes('practice=true');

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const allHaveScored = activePlayerScores.every(score => score > 0);
    setAllScoresEntered(allHaveScored);
  }, [scores, playerCount]);

  useEffect(() => {
    if (currentTable && !currentTableLocal) {
      setCurrentTableLocal(currentTable);
    }
  }, [currentTable]);

  const handleSelectTable = () => {
    if (difficulty) {
      console.log("Current round:", currentRound, "Max rounds:", maxRounds);
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      console.log("New table selected:", newTable);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      
      // First increment the round
      incrementRound();
      
      // Then check if we've reached max rounds
      if (currentRound >= maxRounds - 1) {
        console.log("Max rounds reached, showing dialog");
        setShowRoundsDialog(true);
      }
    }
  };

  const handleNavigateToWinnersCircle = () => {
    console.log("Navigating to winners circle");
    setShowRoundsDialog(false);
    navigate("/winners-circle");
  };

  if (isPracticeMode) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
        <PracticeMode 
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
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
        <div className="text-center text-xl font-semibold">
          Round {currentRound} of {maxRounds}
        </div>
        
        {currentTableLocal && (
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
        )}
        
        <GameControls 
          allScoresEntered={allScoresEntered}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          handleSelectTable={handleSelectTable}
        />
      </div>

      <button
        onClick={() => navigate("/settings")}
        className="mt-auto mx-auto p-4"
      >
        <Settings className="w-8 h-8" />
      </button>

      <AlertDialog open={showRoundsDialog} onOpenChange={setShowRoundsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Maximum Rounds Reached</AlertDialogTitle>
            <AlertDialogDescription>
              You have reached the required number of rounds. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNavigateToWinnersCircle}>
              No, go to Winner's Circle
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowRoundsDialog(false)}>
              Yes, continue playing
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Game;