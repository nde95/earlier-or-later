import { useImageContext } from "../../context/ImageContext";
import { CurrentImage, NextImage } from "../ImageContainers";

const GamePage = () => {
  const { handleGuess } = useImageContext();

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
        <h1 className="font-Poppins">Score: 1000</h1>
      </div>

      {/* Image container */}
      <div className="flex flex-col md:flex-row w-full md:justify-evenly items-center md:w-[900px] md:h-[400px]">
        <div className="mb-4 md:mb-0">
          <CurrentImage />
        </div>
        <div>
          <NextImage />
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
    </div>
  );
};

export default GamePage;
