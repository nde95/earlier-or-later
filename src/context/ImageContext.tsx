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
  setNewImages: React.Dispatch<React.SetStateAction<Image[]>>;
  usedImages: Image[];
  setUsedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  clearImages: () => void;
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

  return (
    <ImageContext.Provider
      value={{
        usedImages,
        setUsedImages,
        newImages,
        setNewImages,
        clearImages,
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
