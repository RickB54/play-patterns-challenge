import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGameStore } from "@/store/gameStore";
import { getRandomTable } from "@/constants/tableImages";
import { useToast } from "@/hooks/use-toast";

// Use multiple placeholder images for better testing
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
];

const Game = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    difficulty: storedDifficulty, 
    usedTables, 
    addUsedTable, 
    setCurrentTable,
    playerCount,
    scores 
  } = useGameStore();
  
  const [showDifficulty, setShowDifficulty] = useState(!storedDifficulty);
  const [difficulty, setDifficulty] = useState(storedDifficulty || "");
  const [currentTable, setCurrentTableLocal] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [allScoresEntered, setAllScoresEntered] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const activePlayerScores = scores.slice(0, playerCount);
    const allHaveScored = activePlayerScores.every(score => score > 0);
    setAllScoresEntered(allHaveScored);
  }, [scores, playerCount]);

  useEffect(() => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      setImageError(false);
      setRetryCount(0);
    }
  }, [difficulty]);

  const handleSelectTable = () => {
    if (difficulty) {
      const newTable = getRandomTable(difficulty as any, usedTables[difficulty as keyof typeof usedTables]);
      setCurrentTableLocal(newTable);
      setCurrentTable(newTable);
      addUsedTable(difficulty, newTable);
      setImageError(false);
      setRetryCount(0);
      toast({
        title: "New Table Selected",
        description: `Difficulty: ${difficulty}`,
      });
    }
  };

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    
    const maxRetries = 1;
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      
      setTimeout(() => {
        setCurrentTableLocal(currentTable);
      }, 2000);
    } else if (!imageError) {
      setImageError(true);
      // Cycle through placeholder images
      setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
      toast({
        title: "Image Load Error",
        description: "Using placeholder image while table loads.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <Card className="p-4 glass-card">
        <img
          src={imageError ? PLACEHOLDER_IMAGES[currentPlaceholderIndex] : (currentTable || PLACEHOLDER_IMAGES[0])}
          alt="Pool Table Setup"
          className="w-full h-auto rounded-lg"
          onError={handleImageError}
          key={`${currentTable}-${retryCount}`}
        />
      </Card>

      <p className="mt-6 text-center text-sm">
        Setup the pool table as shown in the diagram then 'Enter Score' after each
        player's turn is over.
      </p>

      <button onClick={() => navigate("/score")} className="mt-6 btn-primary">
        Enter Score
      </button>

      {allScoresEntered && (
        <div className="mt-6 space-y-4">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty for next round" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <button 
            onClick={handleSelectTable} 
            className="w-full btn-secondary"
            disabled={!difficulty}
          >
            Select Table
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Click the Settings Icon below to Start a new round or to set other
        preferences.
      </p>

      <button
        onClick={() => navigate("/settings")}
        className="mt-auto mx-auto p-4"
      >
        <Settings className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Game;