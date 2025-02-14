import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Star, 
  Plus,
  Crown,
  Timer,
  Target
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const predefinedAwards = [
  {
    id: "perfect-game",
    name: "Perfect Game",
    description: "Completed all shots without any misses",
    icon: Trophy,
  },
  {
    id: "comeback-king",
    name: "Comeback King",
    description: "Won after being behind by 3 or more points",
    icon: Crown,
  },
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    description: "Made 5 difficult shots in a row",
    icon: Target,
  },
  {
    id: "quick-victory",
    name: "Quick Victory",
    description: "Won a game in under 10 minutes",
    icon: Timer,
  },
  {
    id: "consistency",
    name: "Consistency Master",
    description: "Maintained an average score above 7 for 3 games",
    icon: Star,
  }
];

const Awards = () => {
  const navigate = useNavigate();
  const { entries, addAward } = useProgressionStore();
  const { toast } = useToast();
  
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedAward, setSelectedAward] = useState("");

  const players = [...new Set(entries.map(entry => entry.playerName))];
  
  const handleAwardSubmit = () => {
    if (!selectedPlayer || !selectedAward) {
      toast({
        title: "Required Fields",
        description: "Please select both a player and an award",
        variant: "destructive",
      });
      return;
    }

    const award = predefinedAwards.find(a => a.id === selectedAward);
    if (!award) return;

    const newAward = {
      id: crypto.randomUUID(),
      name: award.name,
      description: award.description,
      date: new Date().toISOString(),
      playerId: selectedPlayer,
    };

    addAward(selectedPlayer, newAward);
    
    toast({
      title: "Award Added",
      description: `${award.name} has been awarded to ${selectedPlayer}`,
    });

    setSelectedPlayer("");
    setSelectedAward("");
  };

  const allAwards = entries.reduce((acc: any[], entry) => {
    if (entry.awards) {
      return [...acc, ...entry.awards.map(award => ({
        ...award,
        playerName: entry.playerName
      }))];
    }
    return acc;
  }, []);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Player Awards</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Award Achievement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Player</label>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map((player) => (
                      <SelectItem key={player} value={player}>
                        {player}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Award</label>
                <Select value={selectedAward} onValueChange={setSelectedAward}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an award" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedAwards.map((award) => (
                      <SelectItem key={award.id} value={award.id}>
                        <div className="flex items-center gap-2">
                          <award.icon className="w-4 h-4" />
                          {award.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAwardSubmit} className="w-full">
                Award Achievement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {allAwards.map((award, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {predefinedAwards.find(a => a.name === award.name)?.icon && (
                    <div className="text-primary">
                      {React.createElement(
                        predefinedAwards.find(a => a.name === award.name)?.icon || Trophy,
                        { className: "w-5 h-5" }
                      )}
                    </div>
                  )}
                  <h3 className="font-bold">{award.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{award.description}</p>
                <p className="text-sm">Awarded to: {award.playerName}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(award.date), "MM/dd/yy")}
              </div>
            </div>
          </Card>
        ))}

        {allAwards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No awards yet. Start by adding achievements for players!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Awards;
