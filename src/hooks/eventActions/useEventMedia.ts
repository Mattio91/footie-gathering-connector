
import { useToast } from '@/hooks/use-toast';

interface EventMediaProps {
  currentImages: string[];
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useEventMedia = ({
  currentImages,
  setCurrentImages
}: EventMediaProps) => {
  const { toast } = useToast();

  // Handle image upload
  const handleImageUpload = (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setCurrentImages([imageUrl, ...currentImages.slice(1)]);
      
      toast({
        title: "Image Updated",
        description: "Your event image has been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return {
    handleImageUpload
  };
};
