import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Using simpler, more reliable placeholder images
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
];

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  const handleImageError = () => {
    console.log("Image failed to load, trying placeholder:", currentTable);
    setCurrentPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_IMAGES.length);
    
    toast({
      title: "Loading Table Image",
      description: "Using placeholder while table image loads.",
      variant: "default",
    });
  };

  // Use placeholder if no currentTable, or use currentTable
  const imageToDisplay = currentTable || PLACEHOLDER_IMAGES[currentPlaceholderIndex];

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageToDisplay}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
      />
    </Card>
  );
};

export default PoolTableImage;