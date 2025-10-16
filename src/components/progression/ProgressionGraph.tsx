import { Card } from "@/components/ui/card";
import { ProgressionEntry } from "@/store/progressionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";

interface ProgressionGraphProps {
  entries: ProgressionEntry[];
  metric: "points" | "averagePoints" | "roundsPlayed";
  title: string;
}

const ProgressionGraph = ({ entries, metric, title }: ProgressionGraphProps) => {
  const chartData = entries
    .map((entry) => ({
      date: format(new Date(entry.date), "MM/dd"),
      value: metric === "averagePoints" 
        ? entry.roundsPlayed > 0 ? entry.points / entry.roundsPlayed : 0
        : entry[metric],
      player: entry.playerName || "Anonymous",
    }))
    .reverse();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
            name={title}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProgressionGraph;
