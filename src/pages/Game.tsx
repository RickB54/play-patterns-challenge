import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import DifficultySelector from "@/components/game/DifficultySelector";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Game = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    difficulty: storedDifficulty, 
    usedTables, 
    addUsedTable, 
    setCurrentTable,
    playerCount,
    scores,
    currentTable,
    totalRounds,
    currentRound,
    incrementCurrentRound 
  } = useGameStore();
  
  const [showDifficulty, setShowDifficulty] = useState(!storedDifficulty);
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const [allScoresEntered, setAllScoresEntered] = useState(false);
  const [showRoundEndDialog, setShowRoundEndDialog] = useState(false);

  const isPracticeMode = window.location.search.includes('practice=true');

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const allHaveScored = activePlayerScores.every(score => score > 0);
    setAllScoresEntered(allHaveScored);

    // Check if we've reached the round limit after all players have scored
    if (allHaveScored && currentRound >= totalRounds && playerCount > 1) {
      setShowRoundEndDialog(true);
    }
  }, [scores, playerCount, currentRound, totalRounds]);

  useEffect(() => {
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
      
      if (playerCount > 1) {
        incrementCurrentRound();
        toast({
          title: `Round ${currentRound} of ${totalRounds}`,
          description: `Starting new round...`,
        });
      }
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

      <AlertDialog open={showRoundEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              You have completed all {totalRounds} rounds. Would you like to see the final scores?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/winners")}>
              View Final Scores
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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