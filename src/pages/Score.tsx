import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

const Score = () => {
  const navigate = useNavigate();
  const { playerCount, playerNames, scores, updateScore } = useGameStore();

  const handleScoreChange = (index: number, increment: boolean) => {
    const newScore = increment ? scores[index] + 1 : Math.max(0, scores[index] - 1);
    updateScore(index, newScore);
  };

  const getLayoutClass = () => {
    if (playerCount <= 4) {
      return "flex flex-col space-y-4";
    }
    return "grid grid-cols-2 gap-4";
  };

  const allPlayersScored = scores
    .slice(0, playerCount)
    .every(score => score > 0);

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 text-purple-300 hover:text-purple-200">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1 text-purple-100">Score</h1>
      </div>

      <div className={getLayoutClass()}>
        {playerNames.slice(0, playerCount).map((name, index) => (
          <Card key={index} className="p-4 glass-card bg-[#1A1F2C] border-[#6E59A5] border-2">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-lg font-medium text-purple-200">{name}</span>
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

      {allPlayersScored && (
        <button
          onClick={() => navigate("/winners-circle")}
          className="mt-8 w-full btn-primary"
        >
          View Winner's Circle
        </button>
      )}
    </div>
  );
};

export default Score;