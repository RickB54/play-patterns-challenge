import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

interface PoolTableImageProps {
  currentTable: string | null;
  setCurrentTableLocal: (table: string | null) => void;
}

const PoolTableImage = ({ currentTable, setCurrentTableLocal }: PoolTableImageProps) => {
  const { toast } = useToast();

  const handleImageError = () => {
    console.log("Image failed to load:", currentTable);
    setCurrentTableLocal(PLACEHOLDER_IMAGE);
    
    toast({
      title: "Image Loading",
      description: "Using default image while table image loads.",
      variant: "default",
    });
  };

  return (
    <Card className="p-4 glass-card">
      <img
        src={currentTable || PLACEHOLDER_IMAGE}
        alt="Pool Table Setup"
        className="w-full h-auto rounded-lg"
        onError={handleImageError}
      />
    </Card>
  );
};

export default PoolTableImage;