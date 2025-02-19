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
import { useProgressionStore } from "@/store/progressionStore";
import { useToast } from "@/hooks/use-toast";

// Define valid difficulty types
type Difficulty = "easy" | "intermediate" | "advanced" | "expert";

const Game = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
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
  
  const [difficulty, setDifficulty] = useState<Difficulty>(storedDifficulty as Difficulty || "intermediate");
  const [currentTableLocal, setCurrentTableLocal] = useState<string | null>(currentTable);
  const [atLeastOneScore, setAtLeastOneScore] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [practiceRound, setPracticeRound] = useState(1);
  const addEntry = useProgressionStore(state => state.addEntry);

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

  const handleNextTable = () => {
    if (isPracticeMode) {
      setPracticeRound(prev => prev + 1);
    } else {
      incrementRound();
      if (currentRound >= maxRounds) {
        navigate("/winners-circle");
        return;
      }
    }

    const validDifficulty = difficulty as Difficulty;
    const newTable = getRandomTable(validDifficulty, usedTables[validDifficulty]);
    if (newTable) {
      setCurrentTable(newTable);
      setCurrentTableLocal(newTable);
      addUsedTable(validDifficulty, newTable);
      toast({
        title: "New Table",
        description: "A new table has been loaded",
      });
    }
  };

  const handleScoreChange = (index: number, increment: boolean) => {
    const newScore = increment ? scores[index] + 1 : Math.max(0, scores[index] - 1);
    updateScore(index, newScore);
  };

  const handleEndPractice = () => {
    addEntry({
      date: new Date().toISOString(),
      points: scores[0],
      skillLevels: [difficulty],
      roundsPlayed: practiceRound,
      averagePoints: scores[0] / practiceRound,
      playerName: playerNames[0],
    });
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

      {isPracticeMode ? (
        <div className="flex justify-center w-full">
          <Card className="p-3 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2 w-full max-w-[300px]">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-base font-medium text-purple-200">
                {playerNames[0]}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleScoreChange(0, false)}
                  className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                >
                  <Minus className="w-5 h-5 text-[#D6BCFA]" />
                </button>
                <span className="text-xl font-bold min-w-[2ch] text-center text-white">
                  {scores[0]}
                </span>
                <button
                  onClick={() => handleScoreChange(0, true)}
                  className="p-1.5 rounded-full hover:bg-[#6E59A5]/30 transition-colors score-button"
                >
                  <Plus className="w-5 h-5 text-[#D6BCFA]" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: playerCount }).map((_, index) => (
            <Card key={index} className="p-3 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-base font-medium text-purple-200">
                  {playerNames[index]}
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
      )}

      <ShotClock />

      <div className="flex flex-col gap-2 mt-4">
        <Button 
          size="lg"
          onClick={handleNextTable}
          className="w-full"
        >
          Next Table
        </Button>

        {isPracticeMode && (
          <Button 
            variant="destructive"
            size="lg"
            onClick={handleEndPractice}
            className="w-full"
          >
            End Practice
          </Button>
        )}
      </div>
    </>
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate("/settings")} className="p-2">
            <Settings className="w-6 h-6" />
          </button>
          <div className="text-center text-xl font-semibold">
            {isPracticeMode ? `Round ${practiceRound}` : `Round ${Math.min(currentRound, maxRounds)} of ${maxRounds}`}
          </div>
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
