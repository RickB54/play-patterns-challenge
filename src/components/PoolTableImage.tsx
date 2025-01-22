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
  const [imageUrl, setImageUrl] = useState(currentTable || PLACEHOLDER_IMAGE);

  useEffect(() => {
    if (currentTable) {
      setHasError(false);
      setImageUrl(currentTable);
      console.log("Current table updated:", currentTable);
    }
  }, [currentTable]);

  const handleImageError = () => {
    console.log("Image failed to load:", imageUrl);
    
    if (!hasError) {
      setHasError(true);
      setImageUrl(PLACEHOLDER_IMAGE);
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
        src={imageUrl}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
      />
    </Card>
  );
};

export default PoolTableImage;