import { useEffect, useState } from "react";
import { useImageContext } from "../../../context/ImageContext";
import SkeletonImageContainer from "../../Skeleton/SkeletonImageContainer";
import { ClipLoader } from "react-spinners";
import { useUserContext } from "../../../context/UserContext";
import ImageContainer from "../../ImageContainers/ImageContainer";
import AuthModal from "../../Modals/AuthModal";
import GameOver from "./GameOver";
import { AnimatePresence, motion } from "framer-motion";

const GamePage = () => {
  const {
    newImages,
    setNewImages,
    currentImage,
    setCurrentImage,
    usedImageIds,
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
        const response = await fetch("http://localhost:3001/getrandomphotos");
        const data = await response.json();
        const imageSlice = data.length - 1;
        setNewImages(data.slice(0, imageSlice));
        setCurrentImage([data[data.length - 1]]);

        data.forEach((image: any) => {
          usedImageIds.current.add(image._id);
        });
        setIsMounting(false);
      } catch (error) {
        console.error("Error fetching images:", error);
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
      console.error("Error fetching images:", error);
    } finally {
      setIsMounting(false);
    }
  };

  const handleGuess = (guessType: string) => {
    const nextImage = newImages[0];

    // also need to check if the user has a high score, if they do, update it
    // player probably shouldn't be able to finish the database collection, but probably should have a way to end the game
    // that kind of defeats the idea of a high score though, so maybe not

    if (newImages.length < 6) {
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
      {/* // loader functions as expected, but algo might be too fast to need it. */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/70 z-50">
          <ClipLoader />
        </div>
      )}
      {isGameOver && (
        <AnimatePresence>
          <motion.div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-[#f7ede2]">
            <GameOver isMounting={isMounting} startNewGame={startNewGame} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Score */}

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
        <div className="w-full">
          <div className="flex text-xs text-sky-500 cursor-pointer justify-center md:text-sm md:justify-end font-Poppins">
            <button onClick={() => handleOpenModal()}>
              Log in to your account
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
