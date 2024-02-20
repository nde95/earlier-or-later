import { useEffect, useState } from "react";
import { useImageContext } from "../../../context/ImageContext";
import SkeletonImageContainer from "../../Skeleton/SkeletonImageContainer";
import { useUserContext } from "../../../context/UserContext";
import ImageContainer from "../../ImageContainers/ImageContainer";
import { AuthModal, LeaderboardModal } from "../../Modals";
import GameOver from "./GameOver";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const GamePage = () => {
  const {
    newImages,
    setNewImages,
    currentImage,
    setCurrentImage,
    fetchMoreImages,
    handleNewGame,
  } = useImageContext();
  const { userScore, setUserScore, clearUser } = useUserContext();

  const { currentUser, setCurrentUser } = useUserContext();

  const [isMounting, setIsMounting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")!));
    }

    const fetchDefaultImages = async () => {
      try {
        await handleNewGame();
        setIsMounting(false);
      } catch (error) {
        toast.error("Error fetching images, please refresh the page");
      }
    };
    fetchDefaultImages();
  }, []);

  const startNewGame = async () => {
    setUserScore(0);
    try {
      setIsMounting(true);
      setIsGameOver(false);
      await handleNewGame();
    } catch (error) {
      toast.error("Error fetching images, please refresh the page");
    } finally {
      setIsMounting(false);
    }
  };

  const handleGuess = (guessType: string) => {
    const nextImage = newImages[0];

    if (!isLoading && newImages.length < 6) {
      setIsLoading(true);
      fetchMoreImages();
      setIsLoading(false);
    }

    if (
      (guessType === "earlier" &&
        nextImage.takenDate < currentImage[0].takenDate) ||
      nextImage.takenDate === currentImage[0].takenDate ||
      (guessType === "later" &&
        nextImage.takenDate > currentImage[0].takenDate) ||
      nextImage.takenDate === currentImage[0].takenDate
    ) {
      setUserScore(prevScore => prevScore + 100);
      setCurrentImage(() => [nextImage]);
      setNewImages(prevNewImages => prevNewImages.slice(1));
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <div className="container px-10 my-auto flex flex-col items-center justify-between min-w-full h-screen">
      {/* game over screen */}
      {isGameOver && (
        <AnimatePresence>
          <motion.div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-[#f7ede2]">
            <GameOver isMounting={isMounting} startNewGame={startNewGame} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* User details/login for unauth users */}

      {currentUser ? (
        <div className="w-full">
          <div className="flex text-xs justify-center md:text-sm md:justify-end font-Poppins">
            {`Hello, ${currentUser.username}!`}
          </div>
          <div className="flex text-xs justify-center md:text-sm md:justify-end font-Poppins">
            {`High Score: ${currentUser.highScore} points`}
          </div>
          <div className="flex text-xs text-sky-500 cursor-pointer justify-center md:text-sm md:justify-end font-Poppins">
            <button onClick={() => clearUser()}>Log out</button>
          </div>
        </div>
      ) : (
        <div className="w-full z-50">
          <div className="flex text-xs text-sky-500 cursor-pointer justify-center md:text-sm md:justify-end font-Poppins">
            <button onClick={() => handleOpenModal()}>
              {isGameOver ? (
                <span>Create an account to save your score!</span>
              ) : (
                <span>Log in to your account</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Current Score Streak */}
      <div>
        <h1 className="font-Poppins">Score: {userScore}</h1>
      </div>

      {/* Image container */}
      <div className="flex flex-col md:flex-row w-full md:justify-evenly items-center md:w-[900px] md:h-[400px]">
        <div className="mb-4 md:mb-0">
          {/* current image stack */}
          {isMounting ? (
            <SkeletonImageContainer />
          ) : (
            <ImageContainer isCurrentImage={true} />
          )}
        </div>
        <div>
          {/* comparison image array */}
          {isMounting ? (
            <SkeletonImageContainer />
          ) : (
            <ImageContainer isCurrentImage={false} />
          )}
        </div>
      </div>
      {/* Buttons container*/}
      <div className="flex justify-center gap-10 items-center">
        {/* Buttons container */}
        <div>
          <button
            className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded"
            onClick={() => handleGuess("earlier")}>
            Earlier
          </button>
        </div>
        <p>Or</p>
        <div>
          <button
            onClick={() => handleGuess("later")}
            className="bg-[#F28482] hover:bg-[#A35453] text-white font-bold py-2 px-4 rounded">
            Later
          </button>
        </div>
      </div>
      <div className="py-5"></div>
      <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default GamePage;
