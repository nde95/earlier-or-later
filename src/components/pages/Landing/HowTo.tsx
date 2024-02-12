import { Link } from "react-router-dom";

const HowTo = () => {
  return (
    <div className="container mx-auto text-center flex flex-col items-center justify-center p-4 rounded-md bg-[#F5CAC3]">
      <h1 className="text-2xl font-bold mb-4">How to Play</h1>
      <p className="mb-10 font-semibold">
        Welcome to Earlier or Later! Here's how to get started:
      </p>
      <ul className="list-none ml-6 mb-4">
        <li className="mb-4">
          In this game, you are presented with two images, and you have to guess
          if the image on the left was taken on an earlier or later date than
          the image on the right.
        </li>
        <li className="mb-4 flex items-center justify-center">
          <img
            src="/public/tutorial.PNG"
            alt="tutorial image"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </li>
        <li className="mb-4">
          That can be done with the buttons at the bottom of the screen. Each
          correct guess will earn you 100 points, while an incorrect guess will
          end the game, so make sure you study the images carefully before you
          guess!
        </li>
        <li className="mb-4">
          If you see an image you really like, each image has a link directly to
          the original upload on Flickr, so click it and give them some love!
        </li>
        <li className="mb-4">
          If an image is too small, you can click on it to see a larger version
          for better inspection.
        </li>
      </ul>
      <p className="mb-4">Enjoy the game and have fun!</p>
      <div className="flex justify-center">
        <Link to="/game">
          <button className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded">
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HowTo;
