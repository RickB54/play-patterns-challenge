import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const Score = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1">Score</h1>
      </div>

      <Card className="p-6 glass-card">
        <p className="text-center">Score Keeper implementation coming soon...</p>
      </Card>
    </div>
  );
};

export default Score;