import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { Card } from "@/components/ui/card";

const WinnersCircle = () => {
  const navigate = useNavigate();
  const { playerNames, scores, playerCount } = useGameStore();
  const [rankings, setRankings] = useState<{ name: string; score: number; rank: number }[]>([]);

  useEffect(() => {
    const activeScores = scores.slice(0, playerCount).map((score, index) => ({
      name: playerNames[index],
      score,
      rank: 0
    }));

    const sortedScores = [...activeScores].sort((a, b) => b.score - a.score);
    let currentRank = 1;
    let previousScore = -1;

    sortedScores.forEach((player, index) => {
      if (player.score !== previousScore) {
        currentRank = index + 1;
      }
      player.rank = currentRank;
      previousScore = player.score;
    });

    setRankings(sortedScores);
  }, [scores, playerNames, playerCount]);

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-300">Winner's Circle</h1>
      
      <div className="space-y-4">
        {rankings.map((player, index) => (
          <Card 
            key={index}
            className={`p-6 glass-card ${index === 0 ? 'animate-pulse bg-[#1A1F2C] border-[#8B5CF6]' : 'bg-[#1A1F2C] border-[#6E59A5]'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-[#D6BCFA]">#{player.rank}</span>
                <span className={`text-xl ${index === 0 ? 'text-[#8B5CF6] font-bold' : 'text-[#D6BCFA]'}`}>
                  {player.name}
                </span>
              </div>
              <span className="text-2xl font-bold text-[#D6BCFA]">{player.score}</span>
            </div>
          </Card>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 w-full btn-primary"
      >
        Back to Home
      </button>
    </div>
  );
};

export default WinnersCircle;