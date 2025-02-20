import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Star, 
  Plus,
  Crown,
  Timer,
  Target,
  Calendar as CalendarIcon
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

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
  
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedAward, setSelectedAward] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dialogOpen, setDialogOpen] = useState(false);

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

    setSelectedPlayer(null);
    setSelectedAward("");
    setDialogOpen(false);
  };

  const allAwards = entries.reduce((acc: any[], entry) => {
    if (entry.awards) {
      return [...acc, ...entry.awards.map(award => ({
        ...award,
        playerName: entry.playerName,
        date: new Date(award.date).toISOString()
      }))];
    }
    return acc;
  }, []);

  const filteredAwards = allAwards.filter(award => {
    if (!award) return false;

    const playerMatches = selectedPlayer === null || award.playerName === selectedPlayer;

    let dateMatches = true;
    if (selectedDate) {
      const awardDate = new Date(award.date);
      dateMatches = (
        awardDate.getFullYear() === selectedDate.getFullYear() &&
        awardDate.getMonth() === selectedDate.getMonth() &&
        awardDate.getDate() === selectedDate.getDate()
      );
    }

    return playerMatches && dateMatches;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedPlayer(null);
      setSelectedAward("");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold">Player Awards</h2>
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
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
                <Select value={selectedPlayer || ""} onValueChange={setSelectedPlayer}>
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

      <div className="flex flex-wrap gap-4 mb-6">
        <Select 
          value={selectedPlayer !== null ? selectedPlayer : "all"} 
          onValueChange={(value) => setSelectedPlayer(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by player">
              {selectedPlayer || "All Players"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Players</SelectItem>
            {players.map((player) => (
              <SelectItem key={player} value={player}>
                {player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px]">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {(selectedPlayer !== null || selectedDate) && (
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedPlayer(null);
              setSelectedDate(undefined);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {filteredAwards.map((award) => (
          <Card key={award.id} className="p-4">
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

        {filteredAwards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No awards found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Awards;
