import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useToast } from "@/hooks/use-toast";

const difficultyLevels = [
  {
    name: "Easy",
    value: "easy",
    description: "Perfect for beginners learning the basics of pool",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
  },
  {
    name: "Intermediate",
    value: "intermediate",
    description: "For players familiar with basic techniques",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
  },
  {
    name: "Advanced",
    value: "advanced",
    description: "Challenging setups for experienced players",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&q=80",
  },
  {
    name: "Expert",
    value: "expert",
    description: "Master-level configurations for professional players",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&q=80",
  },
];

const SkillLevels = () => {
  const navigate = useNavigate();
  const { setDifficulty } = useGameStore();
  const { toast } = useToast();

  const handleSelectDifficulty = (difficulty: string) => {
    setDifficulty(difficulty);
    toast({
      title: "Difficulty Selected",
      description: `You've selected ${difficulty} mode`,
    });
    navigate("/setup");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-accent rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold ml-4">Select Skill Level</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {difficultyLevels.map((level) => (
          <Card
            key={level.value}
            className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer animate-fadeIn"
            onClick={() => handleSelectDifficulty(level.value)}
          >
            <div className="relative h-48">
              <img
                src={level.image}
                alt={level.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{level.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">{level.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillLevels;