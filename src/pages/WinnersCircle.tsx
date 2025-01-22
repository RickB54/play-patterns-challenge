import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/store/gameStore";

const WinnersCircle = () => {
  const navigate = useNavigate();
  const { playerCount, playerNames, scores, resetGame } = useGameStore();

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

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1">Winner's Circle</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-4">
        {rankings.map(({ position, playerIndices }) => (
          <div key={position} className="space-y-2">
            {playerIndices.map((playerIndex) => (
              <Card
                key={playerIndex}
                className={`p-4 glass-card ${
                  position === 1
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500"
                    : position === 2
                    ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400"
                    : position === 3
                    ? "bg-gradient-to-r from-amber-700/20 to-amber-800/20 border-amber-700"
                    : "bg-[#1A1F2C] border-[#6E59A5]"
                } border-2`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold">#{position}</span>
                    <span className="text-xl">{playerNames[playerIndex]}</span>
                  </div>
                  <span className="text-2xl font-bold">{scores[playerIndex]}</span>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <button onClick={() => navigate("/game")} className="w-full btn-primary">
          Continue Playing
        </button>
        <button onClick={handleLeaveGame} className="w-full btn-destructive">
          Leave The Game
        </button>
      </div>
    </div>
  );
};

export default WinnersCircle;