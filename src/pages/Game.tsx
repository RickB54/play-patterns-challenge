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
  const [isLandscape, setIsLandscape] = useState(false);
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
      const isCurrentlyLandscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(isCurrentlyLandscape);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    // Initial check
    handleOrientationChange();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [isMobile]);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation) {
          await screen.orientation.lock('landscape').catch(console.error);
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const enterLandscapeMode = async () => {
    try {
      await document.documentElement.requestFullscreen();
      if (screen.orientation) {
        await screen.orientation.lock('landscape').catch(console.error);
      }
    } catch (error) {
      console.error('Landscape mode error:', error);
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
        <div className={isLandscape ? "w-full h-screen flex items-center justify-center bg-black" : "flex-1 min-h-0"}>
          <PoolTableImage 
            currentTable={currentTableLocal} 
            setCurrentTableLocal={setCurrentTableLocal}
          />
          {!isLandscape && (
            <Button 
              onClick={enterLandscapeMode}
              className="w-full mt-2"
              variant="outline"
            >
              View Full Screen
            </Button>
          )}
        </div>
      )}

      {isPracticeMode ? (
        <div className="flex justify-center items-center w-full">
          <Card className="p-3 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2 w-full max-w-[300px] mx-auto">
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
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-[800px] mx-auto">
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
    <div className={isLandscape ? "min-h-screen w-screen overflow-y-auto bg-background" : "h-screen w-screen overflow-hidden bg-background"}>
      <div className={isLandscape ? "w-full" : "container max-w-6xl mx-auto px-4 py-4 h-full flex flex-col"}>
        {!isLandscape && (
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate("/settings")} className="p-2">
              <Settings className="w-6 h-6" />
            </button>
            <div className="text-center text-xl font-semibold">
              {isPracticeMode 
                ? `Round ${practiceRound}`
                : `Round ${Math.min(currentRound, maxRounds)} of ${maxRounds}`
              }
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
        )}

        <div className={isLandscape ? "w-full" : "flex flex-col gap-4 flex-1"}>
          {isLandscape ? (
            <div className="flex flex-col">
              {renderGameContent()}
              <div className="container max-w-6xl mx-auto px-4 py-4">
                <div className="text-center text-xl font-semibold mb-4">
                  {isPracticeMode 
                    ? `Round ${practiceRound}`
                    : `Round ${Math.min(currentRound, maxRounds)} of ${maxRounds}`
                  }
                </div>
                {isPracticeMode ? (
                  <PracticeMode 
                    difficulty={difficulty} 
                    setDifficulty={setDifficulty}
                    currentRound={practiceRound}
                    onIncrementRound={() => setPracticeRound(prev => prev + 1)}
                  />
                ) : (
                  <>
                    {isPracticeMode ? (
                      <div className="flex justify-center items-center w-full mb-4">
                        <Card className="p-3 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2 w-full max-w-[300px] mx-auto">
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
                      <div className="flex justify-center items-center w-full mb-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-[800px] mx-auto">
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
                )}
              </div>
            </div>
          ) : isPracticeMode ? (
            <PracticeMode 
              difficulty={difficulty} 
              setDifficulty={setDifficulty}
              currentRound={practiceRound}
              onIncrementRound={() => setPracticeRound(prev => prev + 1)}
            />
          ) : (
            renderGameContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
