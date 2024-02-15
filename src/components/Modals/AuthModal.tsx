import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import Modal from "./Modal";
import RegisterForm from "../Forms/RegisterForm";

interface AuthModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [displayMode, setDisplayMode] = useState("LOGIN");

  const toggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <RegisterForm />
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
            <LoginForm />
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
