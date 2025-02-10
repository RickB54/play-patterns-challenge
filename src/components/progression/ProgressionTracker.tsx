
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ProgressionTracker = () => {
  const navigate = useNavigate();
  const { entries } = useProgressionStore();
  const [date, setDate] = useState<DateRange | undefined>();

  const filteredEntries = entries.filter((entry) => {
    if (!date?.from || !date?.to) return true;
    
    const entryDate = new Date(entry.date);
    return entryDate >= date.from && entryDate <= date.to;
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

      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filter by Date Range</h3>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "MM/dd/yy")} -{" "}
                        {format(date.to, "MM/dd/yy")}
                      </>
                    ) : (
                      format(date.from, "MM/dd/yy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            {date?.from && date?.to && (
              <Button 
                variant="outline"
                onClick={() => setDate(undefined)}
                className="px-3"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[600px] w-full rounded-md border">
        <div className="relative w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Points</th>
                <th className="p-4 text-left font-semibold"># of Rounds</th>
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
                  <td className="p-4">{entry.points}</td>
                  <td className="p-4">{entry.skillLevels.length}</td>
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

