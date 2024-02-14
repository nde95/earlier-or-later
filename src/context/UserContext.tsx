import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  highScore: number;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userScore: number;
  setUserScore: React.Dispatch<React.SetStateAction<number>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userScore, setUserScore] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser, userScore, setUserScore }}>
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
