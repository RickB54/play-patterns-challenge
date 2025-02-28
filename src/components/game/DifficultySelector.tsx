
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Difficulty = "easy" | "intermediate" | "advanced" | "expert";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (value: string) => void;
}

const DifficultySelector = ({ difficulty, setDifficulty }: DifficultySelectorProps) => {
  return (
    <Select value={difficulty} onValueChange={setDifficulty}>
      <SelectTrigger>
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="easy">Easy</SelectItem>
        <SelectItem value="intermediate">Intermediate</SelectItem>
        <SelectItem value="advanced">Advanced</SelectItem>
        <SelectItem value="expert">Expert</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DifficultySelector;
