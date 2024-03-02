import GamePage from "./components/pages/Game/GamePage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/Landing/LandingPage";
import HowTo from "./components/pages/Landing/HowTo";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/howto" element={<HowTo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
