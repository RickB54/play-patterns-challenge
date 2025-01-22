import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createPoolTablesBucket } from '@/utils/setupStorage';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateBucket = async () => {
    setIsCreating(true);
    const success = await createPoolTablesBucket();
    setIsCreating(false);

    if (success) {
      toast({
        title: "Success!",
        description: "Pool tables bucket created successfully. You can now upload your images.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create bucket. Please check console for details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">Pool Game</h1>
        <p className="text-muted-foreground">Practice your pool skills!</p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/setup')} 
            className="w-full"
          >
            Start Game
          </Button>
          
          <Button 
            onClick={() => navigate('/game?practice=true')} 
            variant="secondary" 
            className="w-full"
          >
            Practice Mode
          </Button>

          <Button
            onClick={handleCreateBucket}
            variant="outline"
            className="w-full"
            disabled={isCreating}
          >
            {isCreating ? 'Creating Bucket...' : 'Create Pool Tables Bucket'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;