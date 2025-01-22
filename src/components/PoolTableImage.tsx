import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
  }, [currentTable]);

  const handleImageError = () => {
    console.error("Failed to load image:", currentTable);
    setImageError(true);
    setIsLoading(false);
    setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
    
    toast({
      title: "Image Load Error",
      description: "Using placeholder image while table loads.",
      variant: "destructive",
    });
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  // If no currentTable or error loading image, show placeholder
  const displayImage = imageError || !currentTable 
    ? PLACEHOLDER_IMAGES[currentPlaceholderIndex]
    : currentTable;

  console.log("Displaying image:", displayImage, "Loading:", isLoading, "Error:", imageError);

  return (
    <Card className="p-4 glass-card relative">
      {isLoading && (
        <Skeleton className="w-full h-64 rounded-lg absolute top-4 left-4" />
      )}
      <img
        src={displayImage}
        alt="Pool Table Setup"
        className={`w-full h-auto rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </Card>
  );
};

export default PoolTableImage;