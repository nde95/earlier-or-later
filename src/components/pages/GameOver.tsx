import { ImageData } from "../../assets/imageData";

const GameOver = () => {
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
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
      <div className="md:mt-8">
        <span className="text-lg font-semibold font-Nunito">
          You lost to this:
        </span>
        <div>
          <h1 className="bg-[#F6BD60] rounded-md text-center p-2 font-Nunito mb-4">
            {ImageData[0].title} taken by {ImageData[0].realName}
          </h1>
        </div>
        <div className="flex justify-center h-80 overflow-hidden">
          <img
            src={`https://live.staticflickr.com/${ImageData[0].serverId}/${ImageData[0]._id}_${ImageData[0].picSecret}_b.jpg`}
            alt={ImageData[0].title}
            className="rounded-md shadow-xl"
          />
        </div>
        <div>
          <span className="font-semibold font-Nunito">Which was taken on:</span>{" "}
          {ImageData[0].takenDate}
        </div>
        <div className="flex flex-col justify-center items-center mt-5 gap-3">
          <a
            className="bg-[#F5CAC3] hover:bg-[#ddb6b0] rounded py-2 px-4 font-bold text-white"
            href={`https://www.flickr.com/photos/${ImageData[0].url}`}
            target="_blank"
            rel="noreferrer">
            View on Flickr
          </a>
          <button className="bg-[#84A59D] hover:bg-[#617B74] text-white font-bold py-2 px-4 rounded mb-4">
            Play Again!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
