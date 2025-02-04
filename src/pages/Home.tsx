import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RulesDialog } from '@/components/RulesDialog';
import { Info, ChartLine } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="container max-w-lg mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl mb-2">Welcome to</h1>
      <h2 className="text-4xl font-bold text-blue-500 mb-8">Pattern Play Runouts</h2>
      
      <div className="glass-card p-6 mb-8 text-left">
        <ul className="space-y-4">
          <li>• Choose either to Play a Game or Practice a Randomly Selected Table</li>
          <li>• Select your Skill Level to match your game</li>
          <li>• Play from a Random Pool Table Setup according to your skill level preference</li>
          <li>• Score points based on your performance of each round</li>
          <li>• Single and Multiplayer Modes</li>
          <li>• Track your progress with an integrated Score Keeper</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/skill-levels')} 
          className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg"
        >
          Play Game
        </Button>
        
        <Button 
          onClick={() => navigate('/game?practice=true')} 
          variant="secondary"
          className="w-full bg-gray-700 hover:bg-gray-600 h-12 text-lg"
        >
          Practice a Table
        </Button>

        <Button 
          onClick={() => navigate('/progression')} 
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 text-lg"
        >
          <ChartLine className="w-5 h-5" />
          Progression Tracker
        </Button>

        <RulesDialog>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12 text-lg"
          >
            <Info className="w-5 h-5" />
            Rules
          </Button>
        </RulesDialog>
      </div>
    </div>
  );
};

export default Home;