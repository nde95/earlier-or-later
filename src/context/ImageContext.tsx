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
  fetchMoreImages: () => Promise<void>;
  handleNewGame: () => Promise<void>;
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
    console.log("clearImages");
    setNewImages([]);
    setCurrentImage([]);
    usedImageIds.current.clear();
  };

  const fetchMoreImages = async () => {
    const response = await fetch("http://localhost:3001/getrandomphotos");
    const data = await response.json();
    data.forEach((image: Image) => {
      if (!usedImageIds.current.has(image._id)) {
        setNewImages(prevNewImages => [...prevNewImages, image]);
        usedImageIds.current.add(image._id);
      }
    });
    console.timeEnd("fetchMoreImages");
  };

  const handleNewGame = async () => {
    usedImageIds.current.clear();
    try {
      const response = await fetch("http://localhost:3001/getrandomphotos");
      const data = await response.json();
      const imageSlice = data.length - 1;
      setNewImages(data.slice(0, imageSlice));
      setCurrentImage([data[data.length - 1]]);

      data.forEach((image: any) => {
        usedImageIds.current.add(image._id);
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
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
        fetchMoreImages,
        handleNewGame,
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
