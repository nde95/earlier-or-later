import GamePage from "./components/pages/GamePage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/Landing/LandingPage";
import HowTo from "./components/pages/Landing/HowTo";
import { useEffect } from "react";
import { useImageContext } from "./context/ImageContext";

function App() {
  const { newImages, setNewImages, usedImages, setUsedImages } =
    useImageContext();

  useEffect(() => {
    fetch("http://localhost:3001/getphotos")
      .then(res => res.json())
      .then(data => {
        setNewImages(data);
        if (data.length > 0) {
          setUsedImages([data[data.length - 1]]);
          // @ts-ignore
          setNewImages(prevImages => prevImages.slice(0, -1));
        }
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  useEffect(() => {
    console.log("newImages", newImages);
    console.log("usedImages", usedImages);
  }, [newImages, usedImages]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/howto" element={<HowTo />} />
    </Routes>
  );
}

export default App;
