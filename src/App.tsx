import GamePage from "./components/GamePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
    </Routes>
  );
}

export default App;
