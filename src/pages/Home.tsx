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
    const uploadedFiles: string[] = [];
    const failedFiles: string[] = [];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    for (const file of Array.from(files)) {
      console.log(`Attempting to upload file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      
      // Check file size and type
      if (file.size > maxFileSize) {
        failedFiles.push(`${file.name} (exceeds 5MB limit)`);
        continue;
      }

      // Verify it's an image file
      if (!file.type.startsWith('image/')) {
        failedFiles.push(`${file.name} (not an image file)`);
        continue;
      }

      try {
        // Add timestamp to filename to prevent conflicts
        const timestamp = new Date().getTime();
        const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters
        const fileName = `${timestamp}-${sanitizedFileName}`;
        
        console.log(`Uploading to Supabase: ${fileName}`);
        
        // First, check if we can connect to Supabase
        const { data: bucketExists } = await supabase
          .storage
          .getBucket('pool-tables');

        if (!bucketExists) {
          console.error('Bucket does not exist or is not accessible');
          throw new Error('Storage bucket not accessible');
        }

        const { data, error } = await supabase.storage
          .from('pool-tables')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/png'  // Explicitly set content type for PNG
          });

        if (error) {
          console.error('Supabase upload error:', error);
          failedFiles.push(`${file.name} (${error.message})`);
          
          // Check if it's an authentication error
          if (error.message.includes('Authentication')) {
            toast({
              title: "Authentication Error",
              description: "Please make sure you're logged in to upload files.",
              variant: "destructive",
            });
            break;
          }
        } else {
          console.log('Upload successful:', data);
          const { data: publicUrl } = supabase.storage
            .from('pool-tables')
            .getPublicUrl(fileName);
          console.log('Public URL:', publicUrl);
          uploadedFiles.push(file.name);
        }
      } catch (error) {
        console.error('Upload error:', error);
        failedFiles.push(`${file.name} (${error.message || 'network error'})`);
      }

      // Add a small delay between uploads
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsUploading(false);

    if (uploadedFiles.length > 0 || failedFiles.length > 0) {
      let description = '';
      if (uploadedFiles.length > 0) {
        description += `Successfully uploaded ${uploadedFiles.length} files. `;
      }
      if (failedFiles.length > 0) {
        description += `Failed to upload: ${failedFiles.join(', ')}`;
      }

      toast({
        title: uploadedFiles.length > 0 ? "Upload Complete" : "Upload Failed",
        description,
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