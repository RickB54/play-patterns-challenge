import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressionEntry } from "@/store/progressionStore";
import { format } from "date-fns";
import { X, Printer } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressionPrintViewProps {
  entries: ProgressionEntry[];
  onClose: () => void;
  selectedPlayer: string;
  selectedDate: string;
}

const ProgressionPrintView = ({
  entries,
  onClose,
  selectedPlayer,
  selectedDate,
}: ProgressionPrintViewProps) => {
  const handlePrint = () => {
    window.print();
  };

  const chartData = entries
    .map((entry) => ({
      date: format(new Date(entry.date), "MM/dd"),
      points: entry.points,
      average: entry.roundsPlayed > 0 ? entry.points / entry.roundsPlayed : 0,
      rounds: entry.roundsPlayed,
    }))
    .reverse();

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto print:overflow-visible">
      <div className="max-w-6xl mx-auto p-8">
        {/* Print controls - hidden when printing */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-3xl font-bold">Progression Report</h1>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print Preview
            </Button>
            <Button onClick={onClose} variant="ghost">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>

        {/* Print content */}
        <div className="space-y-6">
          {/* Header for print */}
          <div className="hidden print:block mb-6">
            <h1 className="text-3xl font-bold mb-2">Pattern Play Runouts</h1>
            <h2 className="text-xl text-muted-foreground">Progression Report</h2>
          </div>

          {/* Report info */}
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Player</p>
                <p className="font-semibold">
                  {selectedPlayer === "all" ? "All Players" : selectedPlayer}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Range</p>
                <p className="font-semibold">
                  {selectedDate === "all" ? "All Dates" : selectedDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="font-semibold">{entries.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Generated</p>
                <p className="font-semibold">{format(new Date(), "PPP")}</p>
              </div>
            </div>
          </Card>

          {/* Points Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Points Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Points"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Average Points Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Average Points Per Round</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Rounds Played Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Rounds Played</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rounds"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  name="Rounds"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Data Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Session Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-2 font-semibold">Date</th>
                    <th className="pb-2 font-semibold">Player</th>
                    <th className="pb-2 font-semibold">Points</th>
                    <th className="pb-2 font-semibold">Rounds</th>
                    <th className="pb-2 font-semibold">Average</th>
                    <th className="pb-2 font-semibold">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{format(new Date(entry.date), "MM/dd/yy")}</td>
                      <td className="py-2">{entry.playerName || "Anonymous"}</td>
                      <td className="py-2">{entry.points}</td>
                      <td className="py-2">{entry.roundsPlayed}</td>
                      <td className="py-2">
                        {entry.roundsPlayed > 0
                          ? (entry.points / entry.roundsPlayed).toFixed(2)
                          : "0.00"}
                      </td>
                      <td className="py-2">{entry.skillLevels.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-6">
            <p>Pattern Play Runouts - Progression Report</p>
            <p>Generated on {format(new Date(), "PPP 'at' p")}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressionPrintView;
