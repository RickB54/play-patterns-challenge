import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProgressionTracker = () => {
  const navigate = useNavigate();
  const { entries, getAveragePoints } = useProgressionStore();

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Progression Tracker</h2>
        <div className="w-10" />
      </div>
      
      <div className="mb-6 space-y-2">
        <p className="text-sm">Average Points:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded bg-accent">
            <p className="text-sm">Today</p>
            <p className="text-lg font-bold">{getAveragePoints('daily').toFixed(2)}</p>
          </div>
          <div className="p-3 rounded bg-accent">
            <p className="text-sm">This Week</p>
            <p className="text-lg font-bold">{getAveragePoints('weekly').toFixed(2)}</p>
          </div>
          <div className="p-3 rounded bg-accent">
            <p className="text-sm">This Month</p>
            <p className="text-lg font-bold">{getAveragePoints('monthly').toFixed(2)}</p>
          </div>
          <div className="p-3 rounded bg-accent">
            <p className="text-sm">All Time</p>
            <p className="text-lg font-bold">{getAveragePoints('all').toFixed(2)}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="p-4 rounded bg-card">
              <div className="text-sm text-muted-foreground">
                {format(new Date(entry.date), "M/dd/yy h:mma")}
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>Points: <span className="font-semibold">{entry.points}</span></p>
                <p>Skill Levels: <span className="font-semibold">{entry.skillLevels.join(", ")}</span></p>
                <p>Rounds: <span className="font-semibold">{entry.roundsPlayed}</span></p>
                <p>Average: <span className="font-semibold">{entry.averagePoints.toFixed(2)}</span></p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProgressionTracker;