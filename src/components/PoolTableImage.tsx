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

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    
    const maxRetries = 1;
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      
      setTimeout(() => {
        setCurrentTableLocal(currentTable);
      }, 2000);
    } else if (!imageError) {
      setImageError(true);
      setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
      toast({
        title: "Image Load Error",
        description: "Using placeholder image while table loads.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageError ? PLACEHOLDER_IMAGES[currentPlaceholderIndex] : (currentTable || PLACEHOLDER_IMAGES[0])}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
        key={`${currentTable}-${retryCount}`}
      />
    </Card>
  );
};

export default PoolTableImage;