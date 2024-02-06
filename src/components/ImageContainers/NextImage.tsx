import { ImageData } from "../../assets/imageData";

const NextImage = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
      {ImageData.slice(1, 2).map((image, index) => (
        <div key={index} className="relative">
          <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2">
            {image.title} by {image.realName}
          </div>
          <div className="-mt-1">
            <img
              src={`https://live.staticflickr.com/${image.serverId}/${image._id}_${image.picSecret}_b.jpg`}
              alt={image.title}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute bottom-0 right-0 mb-2 mr-2">
            <div className="bg-gray-100 rounded text-xs px-2 py-1 opacity-25 hover:opacity-100 transition duration-300">
              <a href={image.url} className="text-blue-500 hover:underline">
                Image Credits
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextImage;
