import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (currentTable) {
      console.log("PoolTableImage received new currentTable:", currentTable);
      setHasError(false);
    }
  }, [currentTable]);

  const handleImageError = () => {
    console.log("Image failed to load, current state:", {
      currentTable,
      hasError,
      placeholderImage: PLACEHOLDER_IMAGE
    });
    
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

  const imageSource = hasError || !currentTable ? PLACEHOLDER_IMAGE : currentTable;
  console.log("Rendering image with source:", imageSource);

  return (
    <Card className="p-4 glass-card">
      <img
        src={imageSource}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
      />
    </Card>
  );
};

export default PoolTableImage;