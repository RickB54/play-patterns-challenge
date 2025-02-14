
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/store/gameStore";

const Setup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewRound = location.state?.newRound;
  
  const { setPlayerCount, setPlayerNames, setDifficulty } = useGameStore();
  const [players, setPlayers] = useState("1");
  const [difficulty, setDifficultyLocal] = useState("");
  const [playerNames, setPlayerNamesLocal] = useState<string[]>([]);

  const handlePlayerCountChange = (value: string) => {
    setPlayers(value);
    const count = parseInt(value);
    setPlayerCount(count);
    setPlayerNamesLocal(Array(count).fill("").map((_, i) => `Player ${i + 1}`));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNamesLocal(newNames);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  useEffect(() => {
    if (playerNames.length > 0) {
      setPlayerNames(playerNames);
    }
  }, [playerNames, setPlayerNames]);

  const handleStartRound = () => {
    // Ensure empty names are replaced with default values
    const finalNames = playerNames.map((name, index) => 
      name.trim() === "" ? `Player ${index + 1}` : name
    );
    setPlayerNames(finalNames);
    setDifficulty(difficulty);
    navigate("/game");
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isNewRound ? "Select Difficulty" : "Players & Skill Level"}
      </h1>

      <Card className="p-6 glass-card space-y-6">
        {!isNewRound && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Number of Players</label>
              <Select value={players} onValueChange={handlePlayerCountChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select players" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} Player{i > 0 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {playerNames.length > 0 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium">Player Names</label>
                {playerNames.map((name, index) => (
                  <Input
                    key={index}
                    placeholder={`Player ${index + 1}`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    onFocus={handleFocus}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Level of Difficulty</label>
          <Select value={difficulty} onValueChange={setDifficultyLocal}>
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
        </div>
      </Card>

      <button
        onClick={handleStartRound}
        className="mt-8 w-full btn-primary"
        disabled={(!isNewRound && playerNames.some(name => !name.trim())) || !difficulty}
      >
        {isNewRound ? "Start New Round" : "Start Game"}
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="mt-auto mx-auto p-4"
      >
        <Settings className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Setup;
