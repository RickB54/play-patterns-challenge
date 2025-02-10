
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/store/gameStore";
import { useProgressionStore } from "@/store/progressionStore";
import { useEffect } from "react";

const WinnersCircle = () => {
  const navigate = useNavigate();
  const { 
    playerCount, 
    playerNames, 
    scores, 
    resetGame, 
    currentRound,
    difficulty 
  } = useGameStore();
  const { addEntry } = useProgressionStore();

  useEffect(() => {
    // Calculate progression data when component mounts
    const totalPoints = scores.slice(0, playerCount).reduce((sum, score) => sum + score, 0);
    const averagePoints = totalPoints / playerCount;
    const actualRoundsPlayed = Math.max(0, currentRound - 1); // Subtract 1 to get actual rounds played

    const progressionEntry = {
      date: new Date().toISOString(),
      points: totalPoints,
      skillLevels: [difficulty],
      roundsPlayed: actualRoundsPlayed,
      averagePoints: averagePoints
    };

    addEntry(progressionEntry);
  }, []); 

  if (!playerCount || playerCount === 0) {
    navigate("/");
    return null;
  }

  // Create array of player indices and sort by score
  const playerRankings = Array.from({ length: playerCount }, (_, i) => i)
    .sort((a, b) => scores[b] - scores[a]);

  // Group players by score to handle ties
  const scoreGroups: { [key: number]: number[] } = {};
  playerRankings.forEach((playerIndex) => {
    const score = scores[playerIndex];
    if (!scoreGroups[score]) {
      scoreGroups[score] = [];
    }
    scoreGroups[score].push(playerIndex);
  });

  // Convert score groups to sorted rankings with tied positions
  const rankings: { position: number; playerIndices: number[] }[] = [];
  let currentPosition = 1;
  Object.entries(scoreGroups)
    .sort(([scoreA], [scoreB]) => Number(scoreB) - Number(scoreA))
    .forEach(([_, playerIndices]) => {
      rankings.push({ position: currentPosition, playerIndices });
      currentPosition += playerIndices.length;
    });

  const handleLeaveGame = () => {
    resetGame();
    navigate("/");
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return <Star className="w-5 h-5 text-blue-400" />;
    }
  };

  // Calculate actual rounds played for display
  const actualRoundsPlayed = Math.max(0, currentRound - 1);

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1">Winner's Circle</h1>
        <div className="w-10" />
      </div>

      <div className="text-center text-xl font-semibold mb-8">
        Rounds ({actualRoundsPlayed})
      </div>

      <div className="space-y-4 flex-1">
        {rankings.map(({ position, playerIndices }) => (
          <div key={position} className="space-y-2">
            {playerIndices.map((playerIndex) => (
              <Card
                key={playerIndex}
                className={`score-card p-4 glass-card transform hover:scale-105 transition-transform duration-200 ${
                  position === 1
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500 animate-fadeIn"
                    : position === 2
                    ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400"
                    : position === 3
                    ? "bg-gradient-to-r from-amber-700/20 to-amber-800/20 border-amber-700"
                    : "bg-[#1A1F2C] border-[#6E59A5]"
                } border-2`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(position)}
                    </div>
                    <span className="text-xl font-semibold">{playerNames[playerIndex]}</span>
                  </div>
                  <span className="text-2xl font-bold">{scores[playerIndex]}</span>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <button onClick={() => navigate("/game")} className="w-full btn-primary hover:scale-105 transition-transform">
          Continue Playing
        </button>
        <button onClick={handleLeaveGame} className="w-full btn-destructive hover:scale-105 transition-transform">
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default WinnersCircle;

