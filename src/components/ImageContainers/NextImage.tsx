import { useImageContext } from "../../context/ImageContext";

const NextImage = () => {
  const { newImages } = useImageContext();
  const comparisonImage = newImages[0];

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
      <div className="relative">
        <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2">
          {comparisonImage.title} by {comparisonImage.realName}
        </div>
        <div className="-mt-1">
          <img
            src={`https://live.staticflickr.com/${comparisonImage.serverId}/${comparisonImage.imageId}_${comparisonImage.picSecret}_b.jpg`}
            alt={comparisonImage.title}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-0 right-0 mb-2 mr-2">
          <div className="bg-gray-100 rounded text-xs px-2 py-1 opacity-25 hover:opacity-100 transition duration-300">
            <a
              href={comparisonImage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              Image Credits
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextImage;
