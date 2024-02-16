import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  highScore: number;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  userScore: number;
  setUserScore: React.Dispatch<React.SetStateAction<number>>;
  clearUser: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userScore,
        setUserScore,
        clearUser,
        isSubmitting,
        setIsSubmitting,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
