import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RulesDialog } from '@/components/RulesDialog';
import { InstructionsDialog } from '@/components/InstructionsDialog';
import { Info, ChartLine, HelpCircle, Maximize, Trophy, BookText } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-6 text-center">
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="rounded-full"
        >
          <Maximize className={`w-5 h-5 ${isFullscreen ? 'text-primary' : ''}`} />
        </Button>
      </div>

      <h1 className="text-2xl mb-2">Welcome to</h1>
      <h2 className="text-4xl font-bold text-blue-500 mb-4">Pattern Play Runouts</h2>
      
      <img 
        src="https://www.dropbox.com/scl/fi/chvhyam23xgnpimdougdb/image-removebg-preview.png?rlkey=ll6iaqr4q0182xsjkz7nxxub4&st=beuxlyyg&raw=1"
        alt="Pattern Play Runouts Logo"
        className="w-48 h-auto mx-auto mb-6"
      />

      <div className="space-y-3">
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

        <Button 
          onClick={() => navigate('/awards')} 
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 text-lg"
        >
          <Trophy className="w-5 h-5" />
          Awards
        </Button>

        <Button 
          onClick={() => navigate('/journal')} 
          variant="outline"
          className="w-full flex items-center justify-center gap-2 h-12 text-lg"
        >
          <BookText className="w-5 h-5" />
          Journal
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <InstructionsDialog>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 text-lg"
            >
              <HelpCircle className="w-5 h-5" />
              Instructions
            </Button>
          </InstructionsDialog>

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
    </div>
  );
};

export default Home;
