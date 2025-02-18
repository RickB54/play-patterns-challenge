import { useState, useEffect } from "react";
import { Settings, Minus, Plus, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import PoolTableImage from "@/components/PoolTableImage";
import PracticeMode from "@/components/game/PracticeMode";
import GameControls from "@/components/game/GameControls";
import ShotClock from "@/components/game/ShotClock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isPracticeMode = window.location.search.includes('practice=true');

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleOrientationChange = () => {
      if (isMobile && screen.orientation) {
        screen.orientation.lock('portrait').catch(console.error);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Initial orientation lock
    if (isMobile && screen.orientation) {
      screen.orientation.lock('portrait').catch(console.error);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isMobile]);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation) {
          await screen.orientation.lock('portrait');
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleScoreChange = (index: number, increment: boolean) => {
    const newScore = increment ? scores[index] + 1 : Math.max(0, scores[index] - 1);
    updateScore(index, newScore);
  };

  const handleEndPractice = () => {
    navigate("/");
  };

  const renderGameContent = () => (
    <>
      {currentTableLocal && (
        <div className="flex-1 min-h-0">
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
        </div>
      )}

      <div className={`grid ${isPracticeMode ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'} gap-3`}>
        {Array.from({ length: isPracticeMode ? 1 : playerCount }).map((_, index) => (
          <Card key={index} className="p-3 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-base font-medium text-purple-200">
                {isPracticeMode ? "Practice Score" : playerNames[index]}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleScoreChange(index, false)}
                  className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                >
                  <Minus className="w-5 h-5 text-[#D6BCFA]" />
                </button>
                <span className="text-xl font-bold min-w-[2ch] text-center text-white">
                  {scores[index]}
                </span>
                <button
                  onClick={() => handleScoreChange(index, true)}
                  className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                >
                  <Plus className="w-5 h-5 text-[#D6BCFA]" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ShotClock />

      {isPracticeMode && (
        <Button 
          variant="destructive"
          size="lg"
          onClick={handleEndPractice}
          className="w-full mt-4"
        >
          End Practice
        </Button>
      )}
    </>
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate("/settings")} className="p-2">
            <Settings className="w-6 h-6" />
          </button>
          {!isPracticeMode && (
            <div className="text-center text-xl font-semibold">
              Round {Math.min(currentRound, maxRounds)} of {maxRounds}
            </div>
          )}
          {isMobile && (
            <button onClick={toggleFullscreen} className="p-2">
              {isFullscreen ? (
                <Minimize2 className="w-6 h-6" />
              ) : (
                <Maximize2 className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {renderGameContent()}
        </div>
      </div>
    </div>
  );
};

export default Game;
