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
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (currentTable) {
      console.log("Setting image source:", currentTable);
      setImageSrc(currentTable);
      setImageError(false);
      setRetryCount(0);
    } else {
      console.log("No current table, using placeholder");
      setImageSrc(PLACEHOLDER_IMAGES[0]);
    }
  }, [currentTable]);

  const handleImageError = () => {
    console.error("Failed to load image:", imageSrc);
    
    const maxRetries = 1;
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      
      setTimeout(() => {
        if (currentTable) {
          setImageSrc(currentTable);
        }
      }, 2000);
    } else if (!imageError) {
      setImageError(true);
      setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
      setImageSrc(PLACEHOLDER_IMAGES[currentPlaceholderIndex]);
      toast({
        title: "Image Load Error",
        description: "Using placeholder image while table loads.",
        variant: "destructive",
      });
    }
  };

  if (!imageSrc) {
    return null;
  }

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageSrc}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
        key={`${imageSrc}-${retryCount}`}
      />
    </Card>
  );
};

export default PoolTableImage;