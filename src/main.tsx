import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./context/ImageContext";
import UserProvider from "./context/UserContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" />
    <UserProvider>
      <ImageProvider>
        <App />
      </ImageProvider>
    </UserProvider>
  </BrowserRouter>
);
