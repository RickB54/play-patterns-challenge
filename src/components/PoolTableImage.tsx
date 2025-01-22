import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
];

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (currentTable) {
      // Test image URL directly
      const testImage = new Image();
      testImage.onload = () => {
        console.log("Image URL is valid and loadable:", currentTable);
      };
      testImage.onerror = (error) => {
        console.error("Image URL failed pre-load test:", currentTable, error);
      };
      testImage.src = currentTable;

      setImageError(false);
      setRetryCount(0);
    }
  }, [currentTable]);

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    console.log("Current retry count:", retryCount);
    
    // Try to fetch the image URL to check for CORS or other issues
    fetch(currentTable || '')
      .then(response => {
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then(() => {
        console.log("Image URL is accessible via fetch");
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
    
    const maxRetries = 3;
    
    if (retryCount < maxRetries) {
      console.log(`Attempting retry ${retryCount + 1} of ${maxRetries}`);
      setRetryCount(prev => prev + 1);
      setImageError(false);
      
      setTimeout(() => {
        console.log("Retrying image load...");
        // Force a new image load by updating the URL
        setCurrentTableLocal(currentTable);
      }, 3000);
    } else if (!imageError) {
      console.log("Max retries reached, switching to placeholder");
      setImageError(true);
      setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
      toast({
        title: "Image Load Error",
        description: `Failed to load image. Error details have been logged to console.`,
        variant: "destructive",
      });
    }
  };

  // Pre-load the next placeholder image
  useEffect(() => {
    const nextIndex = (currentPlaceholderIndex + 1) % PLACEHOLDER_IMAGES.length;
    const img = new Image();
    img.src = PLACEHOLDER_IMAGES[nextIndex];
  }, [currentPlaceholderIndex]);

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageError ? PLACEHOLDER_IMAGES[currentPlaceholderIndex] : (currentTable || PLACEHOLDER_IMAGES[0])}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
        key={`${currentTable}-${retryCount}-${Date.now()}`}
        onLoad={() => console.log("Image loaded successfully:", currentTable)}
        crossOrigin="anonymous"
      />
    </Card>
  );
};

export default PoolTableImage;