
import { useState, useEffect } from "react";
import { Settings, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import GameControls from "@/components/game/GameControls";
import ShotClock from "@/components/game/ShotClock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    playerNames,
    scores,
    updateScore,
    currentTable,
    currentRound,
    maxRounds,
    incrementRound
  } = useGameStore();
  
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const [atLeastOneScore, setAtLeastOneScore] = useState(false);
  const [showRoundsDialog, setShowRoundsDialog] = useState(false);

  const isPracticeMode = window.location.search.includes('practice=true');
  const isGameComplete = currentRound > maxRounds;

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const hasOneScore = activePlayerScores.some(score => score > 0);
    setAtLeastOneScore(hasOneScore);
  }, [scores, playerCount]);

  useEffect(() => {
    if (currentTable && !currentTableLocal) {
      setCurrentTableLocal(currentTable);
    }
  }, [currentTable]);

  const handleNavigateToWinnersCircle = () => {
    setShowRoundsDialog(false);
    navigate("/winners-circle");
  };

  const handleSelectTable = () => {
    if (difficulty) {
      console.log("Selecting new table with difficulty:", difficulty);
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      console.log("New table selected:", newTable);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      incrementRound();

      if (currentRound >= maxRounds) {
        setShowRoundsDialog(true);
      }
    }
  };

  const handleScoreChange = (index: number, increment: boolean) => {
    const newScore = increment ? scores[index] + 1 : Math.max(0, scores[index] - 1);
    updateScore(index, newScore);
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
          className="mt-4 mx-auto p-4"
        >
          <Settings className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="text-center text-xl font-semibold">
          Round {Math.min(currentRound, maxRounds)} of {maxRounds}
        </div>
        
        {isGameComplete && (
          <div className="text-center">
            <Button 
              variant="destructive"
              size="lg"
              onClick={handleNavigateToWinnersCircle}
              className="w-full max-w-md mx-auto"
            >
              End Game
            </Button>
            <p className="mt-2 text-muted-foreground">
              All rounds completed! Enter your final scores below and click "End Game" when ready.
            </p>
          </div>
        )}

        {currentTableLocal && (
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: playerCount }).map((_, index) => (
            <Card key={index} className="p-4 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-lg font-medium text-purple-200">{playerNames[index]}</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleScoreChange(index, false)}
                    className="p-2 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                  >
                    <Minus className="w-6 h-6 text-[#D6BCFA]" />
                  </button>
                  <span className="text-2xl font-bold min-w-[3ch] text-center text-white">
                    {scores[index]}
                  </span>
                  <button
                    onClick={() => handleScoreChange(index, true)}
                    className="p-2 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                  >
                    <Plus className="w-6 h-6 text-[#D6BCFA]" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {!isGameComplete && (
          <GameControls 
            allScoresEntered={atLeastOneScore}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            handleSelectTable={handleSelectTable}
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate("/settings")}
          className="p-4"
        >
          <Settings className="w-8 h-8" />
        </button>
      </div>

      <ShotClock />

      <AlertDialog open={showRoundsDialog} onOpenChange={setShowRoundsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Maximum Rounds Reached</AlertDialogTitle>
            <AlertDialogDescription>
              You have reached the required number of rounds. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNavigateToWinnersCircle}>No, go to Winner's Circle</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowRoundsDialog(false)}>Yes, continue playing</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Game;
