import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (currentTable) {
      // Convert Dropbox URL to direct download URL
      const directUrl = currentTable.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      setCurrentTableLocal(directUrl);
      
      // Test image URL
      const testImage = new Image();
      testImage.onload = () => {
        console.log("Image URL is valid and loadable:", directUrl);
      };
      testImage.onerror = (error) => {
        console.error("Image URL failed pre-load test:", directUrl, error);
      };
      testImage.src = directUrl;
    }
  }, [currentTable, setCurrentTableLocal]);

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    console.log("Current retry count:", retryCount);
    
    const maxRetries = 3;
    
    if (retryCount < maxRetries) {
      console.log(`Attempting retry ${retryCount + 1} of ${maxRetries}`);
      setRetryCount(prev => prev + 1);
      
      setTimeout(() => {
        console.log("Retrying image load...");
        if (currentTable) {
          const directUrl = currentTable.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          setCurrentTableLocal(directUrl);
        }
      }, 3000);
    } else {
      toast({
        title: "Image Load Error",
        description: "Failed to load image after multiple attempts. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (!currentTable) return null;

  const imageUrl = currentTable.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageUrl}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
        key={`${imageUrl}-${retryCount}`}
        onLoad={() => console.log("Image loaded successfully:", imageUrl)}
      />
    </Card>
  );
};

export default PoolTableImage;