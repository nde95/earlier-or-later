import { motion, motionValue, useTransform, animate } from "framer-motion";
import { useImageContext } from "../../../context/ImageContext";
import { useUserContext } from "../../../context/UserContext";
import SkeletonGameOver from "../../Skeleton/SkeletonGameOver";
import { useEffect } from "react";

interface GameOverProps {
  isMounting: boolean;
  startNewGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ isMounting, startNewGame }) => {
  const { newImages } = useImageContext();
  const { currentUser, userScore, updateUserScore } = useUserContext();
  const count = motionValue(0);
  const roundedScore = useTransform(count, Math.round);
  const lastImage = newImages[0];

  useEffect(() => {
    const animation = animate(count, userScore, { duration: 1.5 });

    return animation.stop;
  }, []);

  useEffect(() => {
    if (currentUser && userScore > currentUser?.highScore!) {
      updateUserScore(userScore);
    }
  }, []);

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
      {isMounting ? (
        <div>
          <SkeletonGameOver />
        </div>
      ) : (
        <div className="md:mt-8">
          <span className="text-lg font-semibold font-Nunito">
            You guessed incorrectly against this image:
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
          {userScore === 0 ? (
            <span>You didn't score any points :( Better luck next time!</span>
          ) : userScore > 0 && userScore > currentUser?.highScore! ? (
            <span>
              You just set a new high score! You scored:{" "}
              <motion.span>{roundedScore}</motion.span> points!
            </span>
          ) : (
            <span>
              You scored: <motion.span>{roundedScore}</motion.span> points this
              time. Great job!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOver;
