import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createPoolTablesBucket } from '@/utils/setupStorage';
import { supabase } from '@/lib/supabase';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedFiles = [];
    const failedFiles = [];

    for (const file of files) {
      try {
        const { error } = await supabase.storage
          .from('pool-tables')
          .upload(file.name, file);

        if (error) {
          console.error('Error uploading file:', error);
          failedFiles.push(file.name);
        } else {
          uploadedFiles.push(file.name);
        }
      } catch (error) {
        console.error('Error:', error);
        failedFiles.push(file.name);
      }
    }

    setIsUploading(false);

    if (uploadedFiles.length > 0) {
      toast({
        title: "Upload Complete",
        description: `Successfully uploaded ${uploadedFiles.length} files.${failedFiles.length > 0 ? ` Failed to upload ${failedFiles.length} files.` : ''}`,
        variant: uploadedFiles.length > 0 ? "default" : "destructive",
      });
    }
  };

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
          onClick={() => navigate('/setup')} 
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
          onClick={handleCreateBucket}
          variant="outline"
          className="w-full h-12 text-lg"
          disabled={isCreating}
        >
          {isCreating ? 'Creating Bucket...' : 'Create Pool Tables Bucket'}
        </Button>

        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Pool Table Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {isUploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;