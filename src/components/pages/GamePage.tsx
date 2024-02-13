import { useEffect, useState } from "react";
import { useImageContext } from "../../context/ImageContext";
import { CurrentImage, NextImage } from "../ImageContainers";
import SkeletonImageContainer from "../Skeleton/SkeletonImageContainer";

const GamePage = () => {
  const {
    newImages,
    setNewImages,
    currentImage,
    setCurrentImage,
    usedImageIds,
  } = useImageContext();
  const [userScore, setUserScore] = useState(0);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
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

  const handleGuess = (guessType: string) => {
    const nextImage = newImages[0];

    // add a check for how many images are left, if 5, fetch more images
    // check the images first to see if they're used already, if they arent in either array, keep them if not trash them
    // also need to check if the user has a high score, if they do, update it
    // player probably shouldn't be able to finish the database collection, but probably should have a way to end the game
    // that kind of defeats the idea of a high score though, so maybe not

    if (
      (guessType === "earlier" &&
        nextImage.takenDate < currentImage[0].takenDate) ||
      (guessType === "later" && nextImage.takenDate > currentImage[0].takenDate)
    ) {
      setUserScore(prevScore => prevScore + 100);
      setCurrentImage(() => [nextImage]);
      setNewImages(prevNewImages => prevNewImages.slice(1));
    } else {
      // Incorrect guess, ping the user model to update high score if applicable
      // also end the game, need game over state to implement that
      // also need a solution to make better alerts
      alert("You guessed wrong! Try again!");
    }
  };

  return (
    <div className="container px-10 my-auto flex flex-col items-center justify-between min-w-full h-screen">
      {/* Score */}
      <div className="w-full">
        <div className="flex text-xs justify-center md:text-sm md:justify-end font-Poppins">
          High Score: 1000 points
        </div>
        <div className="flex text-xs justify-center md:text-sm md:justify-end font-Poppins">
          Profile Avatar / Name
        </div>
      </div>

      {/* Current Score Streak */}

      <div>
        <h1 className="font-Poppins">Score: {userScore}</h1>
      </div>

      {/* Image container */}
      <div className="flex flex-col md:flex-row w-full md:justify-evenly items-center md:w-[900px] md:h-[400px]">
        <div className="mb-4 md:mb-0">
          {isMounting ? <SkeletonImageContainer /> : <CurrentImage />}
        </div>

        <div>{isMounting ? <SkeletonImageContainer /> : <NextImage />}</div>
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
    </div>
  );
};

export default GamePage;
