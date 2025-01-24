import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DifficultySelector from "./DifficultySelector";

interface GameControlsProps {
  allScoresEntered: boolean;
  difficulty: string;
  setDifficulty: (value: string) => void;
  handleSelectTable: () => void;
}

const GameControls = ({ 
  allScoresEntered, 
  difficulty, 
  setDifficulty, 
  handleSelectTable 
}: GameControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 space-y-4">
      <button onClick={() => navigate("/score")} className="w-full btn-primary">
        Enter Score
      </button>

      {allScoresEntered && !difficulty && (
        <>
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
        </>
      )}
    </div>
  );
};

export default GameControls;