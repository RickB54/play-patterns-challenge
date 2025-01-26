import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tableImages } from "@/constants/tableImages";

const SkillLevels = () => {
  const navigate = useNavigate();
  const { setDifficulty, setPlayerCount, setPlayerNames, setCurrentTable } = useGameStore();
  const { toast } = useToast();
  const [players, setPlayers] = useState("1");
  const [playerNames, setPlayerNamesLocal] = useState<string[]>([]);

  // Get random table for each difficulty level
  const getRandomTableForDifficulty = (difficulty: keyof typeof tableImages) => {
    const tables = tableImages[difficulty];
    const randomIndex = Math.floor(Math.random() * tables.length);
    return tables[randomIndex];
  };

  const difficultyLevels = [
    {
      name: "Easy",
      value: "easy",
      description: "Perfect for beginners learning the basics of pool",
      image: getRandomTableForDifficulty("easy"),
    },
    {
      name: "Intermediate",
      value: "intermediate",
      description: "For players familiar with basic techniques",
      image: getRandomTableForDifficulty("intermediate"),
    },
    {
      name: "Advanced",
      value: "advanced",
      description: "Challenging setups for experienced players",
      image: getRandomTableForDifficulty("advanced"),
    },
    {
      name: "Expert",
      value: "expert",
      description: "Master-level configurations for professional players",
      image: getRandomTableForDifficulty("expert"),
    },
  ];

  const handlePlayerCountChange = (value: string) => {
    setPlayers(value);
    const count = parseInt(value);
    setPlayerCount(count);
    setPlayerNamesLocal(Array(count).fill("").map((_, i) => `Player ${i + 1}`));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name || `Player ${index + 1}`;
    setPlayerNamesLocal(newNames);
  };

  useEffect(() => {
    if (playerNames.length > 0) {
      setPlayerNames(playerNames);
    }
  }, [playerNames, setPlayerNames]);

  const handleSelectDifficulty = (difficulty: string, tableUrl: string) => {
    if (!players || playerNames.some(name => !name.trim())) {
      toast({
        title: "Missing Information",
        description: "Please enter all player names",
        variant: "destructive",
      });
      return;
    }

    setDifficulty(difficulty);
    setCurrentTable(tableUrl);
    toast({
      title: "Difficulty Selected",
      description: `You've selected ${difficulty} mode`,
    });
    navigate("/game");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-accent rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold ml-4">Players & Skill Level</h1>
      </div>

      <div className="mb-8 space-y-6">
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
                placeholder={`Player ${index + 1} name`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {difficultyLevels.map((level) => (
          <Card
            key={level.value}
            className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer animate-fadeIn"
            onClick={() => handleSelectDifficulty(level.value, level.image)}
          >
            <div className="relative h-48">
              <img
                src={level.image}
                alt={level.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{level.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">
                <span className="font-bold">{level.name}:</span> {level.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillLevels;