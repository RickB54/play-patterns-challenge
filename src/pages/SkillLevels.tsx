import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const isPracticeMode = location.search.includes('practice=true');
  const navigate = useNavigate();
  const { setDifficulty, setPlayerCount, setPlayerNames, setCurrentTable, setMaxRounds } = useGameStore();
  const { toast } = useToast();
  const [players, setPlayers] = useState("2");
  const [rounds, setRounds] = useState("3");
  const [localPlayerNames, setLocalPlayerNames] = useState<string[]>(["Player 1", "Player 2"]);
  const [localPlayerName, setLocalPlayerName] = useState("Player 1");
  const [randomImages, setRandomImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const images: Record<string, string> = {};
    Object.entries(tableImages).forEach(([difficulty, tables]) => {
      const randomIndex = Math.floor(Math.random() * tables.length);
      const directLink = tables[randomIndex].replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      images[difficulty] = directLink;
    });
    setRandomImages(images);

    // Set player count to 1 for practice mode
    if (isPracticeMode) {
      setPlayerCount(1);
      setMaxRounds(1);
    }
  }, [isPracticeMode, setPlayerCount, setMaxRounds]);

  const handlePlayerCountChange = (value: string) => {
    setPlayers(value);
    const count = parseInt(value);
    setPlayerCount(count);
    setLocalPlayerNames(Array(count).fill("").map((_, i) => `Player ${i + 1}`));
  };

  const handleRoundsChange = (value: string) => {
    setRounds(value);
    setMaxRounds(parseInt(value));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...localPlayerNames];
    newNames[index] = name;
    setLocalPlayerNames(newNames);
    setPlayerNames(newNames);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handleSelectDifficulty = (difficulty: string, tableUrl: string) => {
    if (isPracticeMode) {
      if (!localPlayerName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter your name",
          variant: "destructive",
        });
        return;
      }
  
      setDifficulty(difficulty);
      setCurrentTable(tableUrl);
      setPlayerNames([localPlayerName]);
      
      toast({
        title: "Difficulty Selected",
        description: `You've selected ${difficulty} mode`,
      });
      
      navigate(`/game${isPracticeMode ? '?practice=true' : ''}`);
    } else {
      if (!players || localPlayerNames.some(name => !name.trim())) {
        toast({
          title: "Missing Information",
          description: "Please enter all player names",
          variant: "destructive",
        });
        return;
      }
  
      setDifficulty(difficulty);
      setCurrentTable(tableUrl);
      setPlayerNames(localPlayerNames);
      toast({
        title: "Difficulty Selected",
        description: `You've selected ${difficulty} mode`,
      });
      navigate("/game");
    }
  };

  const difficultyLevels = [
    {
      name: "Easy",
      value: "easy",
      description: "Perfect for beginners learning the basics of pool",
    },
    {
      name: "Intermediate",
      value: "intermediate",
      description: "For players familiar with basic techniques",
    },
    {
      name: "Advanced",
      value: "advanced",
      description: "Challenging setups for experienced players",
    },
    {
      name: "Expert",
      value: "expert",
      description: "Master-level configurations for professional players",
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-accent rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold ml-4">
          {isPracticeMode ? "Practice Mode Setup" : "Players & Skill Level"}
        </h1>
      </div>

      {isPracticeMode ? (
        <div className="mb-8 space-y-4">
          <label className="block text-sm font-medium">Player Name</label>
          <Input
            placeholder="Enter your name"
            value={localPlayerName}
            onChange={(e) => setLocalPlayerName(e.target.value)}
            className="w-full"
          />
        </div>
      ) : (
        <div className="mb-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Number of Rounds</label>
            <Select value={rounds} onValueChange={handleRoundsChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select rounds" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1} Round{i > 0 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-4">
            <label className="block text-sm font-medium">Player Names</label>
            {localPlayerNames.map((name, index) => (
              <Input
                key={index}
                placeholder={`Player ${index + 1} name`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                onFocus={handleFocus}
                className="w-full"
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {difficultyLevels.map((level) => (
          <Card
            key={level.value}
            className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer animate-fadeIn"
            onClick={() => handleSelectDifficulty(level.value, randomImages[level.value])}
          >
            <div className="relative h-64">
              {randomImages[level.value] && (
                <img
                  src={randomImages[level.value]}
                  alt={level.name}
                  className="w-full h-full object-contain bg-black"
                />
              )}
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
