import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when currentTable changes
    setHasError(false);
  }, [currentTable]);

  const handleImageError = () => {
    console.log("Image failed to load:", currentTable);
    
    if (!hasError && currentTable !== PLACEHOLDER_IMAGE) {
      setHasError(true);
      setCurrentTableLocal(PLACEHOLDER_IMAGE);
      
      toast({
        title: "Image Loading Error",
        description: "Unable to load table image. Using default image instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 glass-card">
      <img
        src={hasError ? PLACEHOLDER_IMAGE : (currentTable || PLACEHOLDER_IMAGE)}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
      />
    </Card>
  );
};

export default PoolTableImage;