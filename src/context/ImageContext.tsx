import { createContext, useContext, useRef, useState } from "react";

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
  setNewImages: React.Dispatch<React.SetStateAction<Image[]>>;
  currentImage: Image[];
  setCurrentImage: React.Dispatch<React.SetStateAction<Image[]>>;
  clearImages: () => void;
  usedImageIds: React.MutableRefObject<Set<string>>;
}

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [newImages, setNewImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<Image[]>([]);
  const usedImageIds = useRef(new Set<string>());

  const clearImages = () => {
    setNewImages([]);
    setCurrentImage([]);
    usedImageIds.current.clear();
  };

  return (
    <ImageContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        newImages,
        setNewImages,
        clearImages,
        usedImageIds,
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
