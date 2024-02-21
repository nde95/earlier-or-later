import { createContext, useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  usedImageIds: React.MutableRefObject<Set<string>>;
  fetchMoreImages: () => Promise<void>;
  handleNewGame: () => Promise<boolean>;
}

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [newImages, setNewImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<Image[]>([]);
  const usedImageIds = useRef(new Set<string>());

  const fetchMoreImages = async () => {
    const response = await fetch(
      "https://earlier-or-later-api.onrender.com/getrandomphotos"
    );
    const data = await response.json();
    data.forEach((image: Image) => {
      if (!usedImageIds.current.has(image._id)) {
        setNewImages(prevNewImages => [...prevNewImages, image]);
        usedImageIds.current.add(image._id);
      }
    });
  };

  const handleNewGame = async () => {
    usedImageIds.current.clear();
    try {
      const response = await fetch(
        "https://earlier-or-later-api.onrender.com/getrandomphotos"
      );
      const data = await response.json();
      const imageSlice = data.length - 1;
      setNewImages(data.slice(0, imageSlice));
      setCurrentImage([data[data.length - 1]]);

      data.forEach((image: any) => {
        usedImageIds.current.add(image._id);
      });

      return data;
    } catch (error) {
      toast.error("Error fetching images, please refresh the page");
    }
  };

  return (
    <ImageContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        newImages,
        setNewImages,
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
