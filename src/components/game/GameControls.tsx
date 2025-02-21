
import { useNavigate } from "react-router-dom";
import DifficultySelector from "./DifficultySelector";

type Difficulty = "easy" | "intermediate" | "advanced" | "expert";

interface GameControlsProps {
  allScoresEntered: boolean;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  handleSelectTable: () => void;
}

const GameControls = ({ 
  difficulty, 
  setDifficulty, 
  handleSelectTable 
}: GameControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 space-y-4">
      <DifficultySelector 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
      />
      <button 
        onClick={handleSelectTable} 
        className="w-full btn-secondary"
        disabled={!difficulty}
      >
        Select Table
      </button>
    </div>
  );
};

export default GameControls;
