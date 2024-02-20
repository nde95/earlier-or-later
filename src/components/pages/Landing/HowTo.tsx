import { Link } from "react-router-dom";

const HowTo = () => {
  return (
    <div className="container mx-auto text-center flex flex-col items-center justify-center p-4 rounded-md bg-[#F5CAC3]">
      <h1 className="text-2xl font-bold mb-2">How to Play</h1>
      <p className="mb-5 font-semibold">
        Welcome to Earlier or Later! Here's how to get started:
      </p>
      <hr className="w-full pb-1 mb-2 bg-black" />
      <ul className="list-none ml-6 mb-4">
        <li className="mb-4">
          In this game, you will be shown two images side by side (or on top of
          each other on mobile) and you have to guess if the image with the
          visible date was originally taken on an earlier or later date than the
          comparison image using the buttons on the bottom of the screen and
          your own intuition. Get it right, and earn 100 points, get it wrong
          and the game is <span className="italic font-semibold">over!</span>
        </li>
        <li className="mb-4 flex items-center justify-center">
          <img
            src="/tutorial.PNG"
            alt="tutorial image"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </li>
        <li className="mb-4"></li>
        <li className="mb-4 flex flex-col items-center justify-center">
          If an image is too small, give it a click and see the full size image
          for thorough inspection.
          <img
            src="/tutomodal.PNG"
            alt="tutorial image"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </li>
        <li className="mb-4">
          All images are from users on Flickr and credit is linked directly to
          the source, so if you see something you like, give it a click and give
          the photographer some love!
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
