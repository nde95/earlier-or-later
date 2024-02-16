import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import Modal from "./Modal";
import RegisterForm from "../Forms/RegisterForm";

interface AuthModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [displayMode, setDisplayMode] = useState("LOGIN");

  const toggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  const handleAuthSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSuccess={handleAuthSuccess}>
      <div className="w-full h-full flex flex-col justify-center items-center px-5">
        {displayMode === "REGISTER" ? (
          <>
            <div className="font-semibold font-Poppins">
              Create a new account
            </div>
            <span
              onClick={() => toggleDisplayMode()}
              className="text-xs text-sky-400 mb-10 cursor-pointer font-Poppins">
              Or log in to your account
            </span>
            <RegisterForm onSuccess={handleAuthSuccess} />
          </>
        ) : (
          <>
            <div className="font-semibold font-Poppins">
              Log In to your account
            </div>
            <span
              onClick={() => toggleDisplayMode()}
              className="text-xs text-sky-400 mb-10 cursor-pointer font-Poppins">
              Don't have an account?
            </span>
            <LoginForm onSuccess={handleAuthSuccess} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
