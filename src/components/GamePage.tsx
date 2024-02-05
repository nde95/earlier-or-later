import { CurrentImage, NextImage } from "./ImageContainers";

const GamePage = () => {
  return (
    <div className="container px-10 my-auto flex flex-col items-center justify-between min-w-full h-screen">
      {/* Score */}
      <div className="w-full">
        <div className="flex justify-end">Score: 1000 points</div>
      </div>

      {/* Image container */}
      <div className="flex flex-col md:flex-row w-full md:justify-evenly items-center">
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Earlier
          </button>
        </div>
        <p>Or</p>
        <div>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Later
          </button>
        </div>
      </div>
      <div className="py-5"></div>
    </div>
  );
};

export default GamePage;
