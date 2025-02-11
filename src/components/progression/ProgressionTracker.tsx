
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ALL_OPTION = "all";

const ProgressionTracker = () => {
  const navigate = useNavigate();
  const { entries } = useProgressionStore();
  const [selectedDate, setSelectedDate] = useState<string>(ALL_OPTION);
  const [selectedPlayer, setSelectedPlayer] = useState<string>(ALL_OPTION);

  // Get unique dates and players for dropdowns
  const uniqueDates = useMemo(() => {
    const dates = [...new Set(entries.map(entry => 
      format(new Date(entry.date), "MM/dd/yy")
    ))];
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [entries]);

  const uniquePlayers = useMemo(() => {
    return [...new Set(entries.map(entry => entry.playerName || 'Anonymous'))];
  }, [entries]);

  const filteredEntries = entries.filter((entry) => {
    const matchesDate = selectedDate === ALL_OPTION || 
      format(new Date(entry.date), "MM/dd/yy") === selectedDate;
    
    const matchesPlayer = selectedPlayer === ALL_OPTION || 
      entry.playerName === selectedPlayer;

    return matchesDate && matchesPlayer;
  });

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Progression Tracker</h2>
        <div className="w-10" />
      </div>

      <Card className="p-4 mb-6 space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_OPTION}>All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Player</Label>
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a player" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_OPTION}>All Players</SelectItem>
                  {uniquePlayers.map((player) => (
                    <SelectItem key={player} value={player}>
                      {player}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(selectedDate !== ALL_OPTION || selectedPlayer !== ALL_OPTION) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedDate(ALL_OPTION);
                setSelectedPlayer(ALL_OPTION);
              }}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Card>

      <ScrollArea className="h-[600px] w-full rounded-md border">
        <div className="relative w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Player</th>
                <th className="p-4 text-left font-semibold">Points</th>
                <th className="p-4 text-left font-semibold">Level of Difficulty</th>
                <th className="p-4 text-left font-semibold">Rounds Played</th>
                <th className="p-4 text-left font-semibold">Average Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr 
                  key={index} 
                  className="border-t hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    {format(new Date(entry.date), "MM/dd/yy")}
                  </td>
                  <td className="p-4">{entry.playerName || 'Anonymous'}</td>
                  <td className="p-4">{entry.points}</td>
                  <td className="p-4">{entry.skillLevels.join(", ")}</td>
                  <td className="p-4">{entry.roundsPlayed}</td>
                  <td className="p-4">{entry.averagePoints.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProgressionTracker;
