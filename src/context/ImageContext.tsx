import { createContext, useContext, useState } from "react";

interface Image {
  _id: string;
  userId: string;
  imageId: string;
  takenDate: Date;
  username: string;
  realName: string;
  title: string;
  format: string;
  picSecret: string;
  url: string;
  pageType: string;
  serverId: string;
}

interface ImageContextType {
  newImages: Image[];
  setNewImages: (images: Image[]) => void;
  usedImages: Image[];
  setUsedImages: (images: Image[]) => void;
  clearImages: () => void;
  isCorrect: boolean;
  setIsCorrect: (isCorrect: boolean) => void;
  handleGuess: (isCorrect: boolean) => void;
}

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [newImages, setNewImages] = useState<Image[]>([]);
  const [usedImages, setUsedImages] = useState<Image[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const clearImages = () => {
    setNewImages([]);
    setUsedImages([]);
  };

  const handleGuess = (isCorrect: boolean) => {
    if (isCorrect && newImages.length > 0) {
      const newUsedImage = newImages[0];
      setUsedImages(prevUsedImages => [newUsedImage, ...prevUsedImages]);
      setNewImages(prevNewImages => prevNewImages.slice(1));
      setIsCorrect(false);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        usedImages,
        setUsedImages,
        newImages,
        setNewImages,
        clearImages,
        isCorrect,
        setIsCorrect,
        handleGuess,
      }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
