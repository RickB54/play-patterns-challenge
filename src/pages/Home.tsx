import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="text-center space-y-2 animate-fadeIn">
        <h1 className="text-2xl font-light">Welcome to</h1>
        <h2 className="text-4xl font-bold text-primary">Pattern Play Runouts</h2>
      </div>

      <Card className="mt-8 p-6 glass-card">
        <ul className="space-y-3 text-sm">
          <li>• Choose either to Play a Game or Practice a Randomly Selected Table</li>
          <li>• Select your Skill Level to match your game</li>
          <li>• Play from a Random Pool Table Setup according to your skill level preference</li>
          <li>• Score points based on your performance of each round</li>
          <li>• Single and Multiplayer Modes</li>
          <li>• Track your progress with an integrated Score Keeper</li>
        </ul>
      </Card>

      <div className="mt-8 space-y-4">
        <button 
          onClick={() => navigate("/setup")} 
          className="w-full btn-primary"
        >
          Play Game
        </button>
        <button 
          onClick={() => navigate("/game")} 
          className="w-full btn-secondary"
        >
          Practice a Table
        </button>
      </div>

      <div className="mt-8 p-4 glass-card">
        <img 
          src="/placeholder.svg" 
          alt="Pool Table Setup" 
          className="w-full h-auto rounded-lg"
        />
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Quick Practice Table
        </p>
      </div>
    </div>
  );
};

export default Home;