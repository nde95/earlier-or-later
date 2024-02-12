import GamePage from "./components/pages/GamePage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/Landing/LandingPage";
import HowTo from "./components/pages/Landing/HowTo";
import { useEffect } from "react";
import { useImageContext } from "./context/ImageContext";

function App() {
  const {
    setNewImages,
    setCurrentImage,
    newImages,
    currentImage,
    usedImageIds,
  } = useImageContext();

  useEffect(() => {
    const fetchDefaultImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/getrandomphotos");
        const data = await response.json();
        setNewImages(data);
        if (data.length > 0) {
          data.forEach((image: any) => {
            usedImageIds.current.add(image._id);
          });
          setCurrentImage([data[data.length - 1]]);
          // @ts-ignore
          setNewImages(prevImages => prevImages.slice(0, -1));
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchDefaultImages();
  }, []);

  useEffect(() => {
    console.log("New images:", newImages);
    console.log("Used images:", currentImage);
    console.log("Used image ids:", usedImageIds.current);
  }, [usedImageIds, newImages, currentImage]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/howto" element={<HowTo />} />
    </Routes>
  );
}

export default App;
