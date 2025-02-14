
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import { ArrowLeft, Download } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ALL_OPTION = "all";

const ProgressionTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { entries, clearAllData } = useProgressionStore();
  const [selectedDate, setSelectedDate] = useState<string>(ALL_OPTION);
  const [selectedPlayer, setSelectedPlayer] = useState<string>(ALL_OPTION);
  const [showClearDialog, setShowClearDialog] = useState(false);

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

  const handleClearAll = () => {
    clearAllData();
    setShowClearDialog(false);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Player', 'Points', 'Skill Levels', 'Rounds Played', 'Average Points'];
    const rows = filteredEntries.map(entry => [
      format(new Date(entry.date), "MM/dd/yy"),
      entry.playerName || 'Anonymous',
      entry.points,
      entry.skillLevels.join(', '),
      entry.roundsPlayed,
      entry.averagePoints.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'progression_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: "Your progression data has been exported to CSV",
    });
  };

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

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="flex gap-2 w-full md:w-auto">
              {(selectedDate !== ALL_OPTION || selectedPlayer !== ALL_OPTION) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedDate(ALL_OPTION);
                    setSelectedPlayer(ALL_OPTION);
                  }}
                  className="flex-1 md:flex-none"
                >
                  Clear Filters
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={exportToCSV}
                className="flex-1 md:flex-none"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
            <Button 
              variant="destructive"
              onClick={() => setShowClearDialog(true)}
              className="flex-1 md:flex-none"
            >
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[600px] w-full rounded-md border">
        <div className="relative w-full">
          <div className="grid grid-cols-1 gap-4 p-4">
            {filteredEntries.map((entry, index) => (
              <Card key={index} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {format(new Date(entry.date), "MM/dd/yy")}
                  </span>
                  <span className="text-muted-foreground">
                    {entry.playerName || 'Anonymous'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Points: </span>
                    {entry.points}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Difficulty: </span>
                    {entry.skillLevels.join(", ")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rounds: </span>
                    {entry.roundsPlayed}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average: </span>
                    {entry.averagePoints.toFixed(2)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              All data will be erased! This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll}>
              Yes, clear all data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProgressionTracker;
