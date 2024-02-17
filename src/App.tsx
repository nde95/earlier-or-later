import GamePage from "./components/pages/GamePage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/Landing/LandingPage";
import HowTo from "./components/pages/Landing/HowTo";
import { useEffect } from "react";
import { useImageContext } from "./context/ImageContext";
import TestPage from "./components/TestPage";
import NotFound from "./components/pages/NotFound";

// TO DO

// end game state handling
// add user score to context and update it when the game ends
// make that reflect in the user's profile and in the UI

function App() {
  const { newImages, currentImage, usedImageIds } = useImageContext();

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
      <Route path="/auth" element={<TestPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
