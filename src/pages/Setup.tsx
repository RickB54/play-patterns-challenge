import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const Setup = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState("1");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">Players & Skill Level</h1>

      <Card className="p-6 glass-card space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Number of Players</label>
          <Select value={players} onValueChange={setPlayers}>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Level of Difficulty</label>
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
        </div>
      </Card>

      <button
        onClick={() => navigate("/game")}
        className="mt-8 w-full btn-primary"
        disabled={!difficulty}
      >
        Start Round
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