import DifficultySelector from "./DifficultySelector";

interface PracticeModeProps {
  difficulty: string;
  setDifficulty: (value: string) => void;
}

const PracticeMode = ({ difficulty, setDifficulty }: PracticeModeProps) => {
  return (
    <div className="flex-grow">
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
    </div>
  );
};

export default PracticeMode;