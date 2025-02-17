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
  const { setDifficulty, setPlayerCount, setPlayerNames, setCurrentTable } = useGameStore();
  const { toast } = useToast();
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
    }
  }, [isPracticeMode, setPlayerCount]);

  const handleSelectDifficulty = (difficulty: string, tableUrl: string) => {
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
    
    navigate("/game?practice=true");
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
        <h1 className="text-3xl font-bold ml-4">Practice Mode Setup</h1>
      </div>

      <div className="mb-8 space-y-4">
        <label className="block text-sm font-medium">Player Name</label>
        <Input
          placeholder="Enter your name"
          value={localPlayerName}
          onChange={(e) => setLocalPlayerName(e.target.value)}
          className="w-full"
        />
      </div>

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
