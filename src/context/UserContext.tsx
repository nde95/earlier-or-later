import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface User {
  username: string;
  email: string;
  password: string;
  id: number;
  highscore: number;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  userScore: number;
  setUserScore: React.Dispatch<React.SetStateAction<number>>;
  clearUser: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserScore: (highScore: number) => void;
  setLeaderboard: React.Dispatch<React.SetStateAction<User[] | null>>;
  leaderboard: User[] | null;
  getLeaderboard: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaderboard, setLeaderboard] = useState<User[] | null>(null);

  const clearUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const getLeaderboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/leaderboard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }

      const data = await response.json();
      setLeaderboard(data);
    } catch {
      toast.error("Error fetching leaderboard");
    }
  };

  const updateUserScore = async (highscore: number) => {
    try {
      const response = await fetch(`http://localhost:3001/updatehighscore`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser?.username,
          highscore: highscore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user score");
      }

      const data = await response.json();
      const updatedHighScore = data.highScore;

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = {
          ...user,
          highscore: updatedHighScore,
        };

        // Store the updated user model in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        if (currentUser) {
          currentUser.highscore = updatedHighScore;
          setCurrentUser(currentUser);
        }
      } else {
        console.warn("User not found in localStorage");
      }
    } catch (error) {
      console.error(error);
    }
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
        updateUserScore,
        getLeaderboard,
        setLeaderboard,
        leaderboard,
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
