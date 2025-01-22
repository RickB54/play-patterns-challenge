import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

const Score = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<number[]>(Array(8).fill(0));
  const [playerNames] = useState<string[]>(["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"]);
  const activePlayers = 4; // This should be passed from the setup page later

  const handleScoreChange = (index: number, increment: boolean) => {
    const newScores = [...scores];
    if (increment) {
      newScores[index] += 1;
    } else if (newScores[index] > 0) {
      newScores[index] -= 1;
    }
    setScores(newScores);
  };

  const getLayoutClass = () => {
    if (activePlayers <= 4) {
      return "flex flex-col space-y-4";
    }
    return "grid grid-cols-2 gap-4";
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1">Score</h1>
      </div>

      <div className={getLayoutClass()}>
        {playerNames.slice(0, activePlayers).map((name, index) => (
          <Card key={index} className="p-4 glass-card">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-lg font-medium">{name}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleScoreChange(index, false)}
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                >
                  <Minus className="w-6 h-6 text-primary" />
                </button>
                <span className="text-2xl font-bold min-w-[3ch] text-center">
                  {scores[index]}
                </span>
                <button
                  onClick={() => handleScoreChange(index, true)}
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                >
                  <Plus className="w-6 h-6 text-primary" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Score;