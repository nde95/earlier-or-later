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
  handleGuess: (guessType: string) => void;
}

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [newImages, setNewImages] = useState<Image[]>([]);
  const [usedImages, setUsedImages] = useState<Image[]>([]);

  const clearImages = () => {
    setNewImages([]);
    setUsedImages([]);
  };

  const handleGuess = (guessType: string) => {
    const currentImage = usedImages[0];
    const nextImage = newImages[0];

    if (
      guessType === "earlier" &&
      nextImage.takenDate < currentImage.takenDate
    ) {
      // implement score logic
      setUsedImages(prevUsedImages => [nextImage, ...prevUsedImages]);
      setNewImages(prevNewImages => prevNewImages.slice(1));
    } else if (
      guessType === "later" &&
      nextImage.takenDate > currentImage.takenDate
    ) {
      // implement score logic
      setUsedImages(prevUsedImages => [nextImage, ...prevUsedImages]);
      setNewImages(prevNewImages => prevNewImages.slice(1));
    } else {
      // Incorrect guess
      alert("You guessed wrong! Try again!");
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
