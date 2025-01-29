import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";

const Index = () => {
  const navigate = useNavigate();
  const { resetGame, setPracticeMode } = useGameStore();

  const handleStartGame = () => {
    resetGame();
    setPracticeMode(false);
    navigate("/skill-levels");
  };

  const handlePracticeMode = () => {
    resetGame();
    setPracticeMode(true);
    navigate("/skill-levels");
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-full space-y-4">
          <button
            onClick={handleStartGame}
            className="w-full btn-primary"
          >
            Play Game
          </button>
          
          <button
            onClick={handlePracticeMode}
            className="w-full btn-secondary"
          >
            Practice a Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;