import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Use multiple placeholder images for better testing
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
      console.log("Current Table URL changed:", currentTable);
      // Reset error state and retry count when URL changes
      setImageError(false);
      setRetryCount(0);
    }
  }, [currentTable]);

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    console.log("Current retry count:", retryCount);
    
    const maxRetries = 3; // Increased from 1 to 3
    
    if (retryCount < maxRetries) {
      console.log(`Attempting retry ${retryCount + 1} of ${maxRetries}`);
      setRetryCount(prev => prev + 1);
      setImageError(false);
      
      // Add a longer delay between retries
      setTimeout(() => {
        console.log("Retrying image load...");
        setCurrentTableLocal(currentTable);
      }, 3000); // Increased from 2000 to 3000ms
    } else if (!imageError) {
      console.log("Max retries reached, switching to placeholder");
      setImageError(true);
      setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
      toast({
        title: "Image Load Error",
        description: "Using placeholder image while table loads. Please check your internet connection.",
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
        key={`${currentTable}-${retryCount}-${Date.now()}`} // Added timestamp to force re-render
        onLoad={() => console.log("Image loaded successfully:", currentTable)}
      />
    </Card>
  );
};

export default PoolTableImage;