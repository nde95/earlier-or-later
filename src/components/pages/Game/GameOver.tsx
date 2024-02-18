import { useImageContext } from "../../../context/ImageContext";
import SkeletonGameOver from "../../Skeleton/SkeletonGameOver";

interface GameOverProps {
  isMounting: boolean;
  startNewGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ isMounting, startNewGame }) => {
  const { newImages } = useImageContext();
  const lastImage = newImages[0];

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
      {isMounting ? (
        <div>
          <SkeletonGameOver />
        </div>
      ) : (
        <div className="md:mt-8">
          <span className="text-lg font-semibold font-Nunito">
            You guess incorrectly against this image:
          </span>
          <div>
            <h1 className="bg-[#F6BD60] rounded-md text-center p-2 font-Nunito mb-4">
              {lastImage.title} taken by {lastImage.realName}
            </h1>
          </div>
          <div className="flex justify-center h-80 overflow-hidden">
            <img
              src={`https://live.staticflickr.com/${lastImage.serverId}/${lastImage._id}_${lastImage.picSecret}_b.jpg`}
              alt={lastImage.title}
              className="rounded-md shadow-xl"
            />
          </div>
          <div>
            <span className="font-semibold font-Nunito">
              Which was taken on:
            </span>{" "}
            {lastImage.takenDate.toString().substring(0, 10)}
          </div>
          <div className="flex flex-col justify-center items-center mt-5 gap-3">
            <a
              className="bg-[#F5CAC3] hover:bg-[#ddb6b0] rounded py-2 px-4 font-bold text-white"
              href={`https://www.flickr.com/photos/${lastImage.url}`}
              target="_blank"
              rel="noreferrer">
              View on Flickr
            </a>
            <button
              className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded mb-4"
              onClick={startNewGame}>
              Play Again!
            </button>
          </div>
        </div>
      )}
      <div className="absolute top-8 mb-5">
        <div>
          <h1 className="text-3xl font-bold font-Nunito">Game Over!</h1>
        </div>
        <div className="font-semibold font-Poppins">
          {/* Add conditional for 0 points, conditional for lower than high score, conditional for new high score */}
          {/* extend conditional to the span to make the color change depending on the render */}
          You scored: <span>100</span> points
        </div>
      </div>
    </div>
  );
};

export default GameOver;
