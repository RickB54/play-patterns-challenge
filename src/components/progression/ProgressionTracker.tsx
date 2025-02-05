import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProgressionTracker = () => {
  const navigate = useNavigate();
  const { entries } = useProgressionStore();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Progression Tracker</h2>
        <div className="w-10" />
      </div>

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
              {entries.map((entry, index) => (
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