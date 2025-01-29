import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/button";

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
          <Button
            onClick={handleStartGame}
            className="w-full"
            size="lg"
          >
            Play Game
          </Button>
          
          <Button
            onClick={handlePracticeMode}
            className="w-full"
            variant="secondary"
            size="lg"
          >
            Practice a Table
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;