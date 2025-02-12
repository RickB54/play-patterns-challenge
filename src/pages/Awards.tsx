
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useProgressionStore } from "@/store/progressionStore";
import { format } from "date-fns";

const Awards = () => {
  const navigate = useNavigate();
  const { entries } = useProgressionStore();
  
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
        <div className="w-10" />
      </div>

      <div className="grid gap-4">
        {allAwards.map((award, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{award.name}</h3>
                <p className="text-sm text-muted-foreground">{award.description}</p>
                <p className="text-sm">Awarded to: {award.playerName}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(award.date), "MM/dd/yy")}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Awards;
