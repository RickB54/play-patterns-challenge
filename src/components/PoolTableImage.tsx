import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (currentTable && currentTable !== PLACEHOLDER_IMAGE && !hasError) {
      console.log("Image failed to load, switching to placeholder:", currentTable);
      
      setHasError(true);
      setCurrentTableLocal(PLACEHOLDER_IMAGE);
      
      toast({
        title: "Image Loading Error",
        description: "Unable to load table image. Using default image instead.",
        variant: "destructive",
      });
    }
  };

  // Only use placeholder if there's an error or no current table
  const imageSource = hasError || !currentTable ? PLACEHOLDER_IMAGE : currentTable;

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