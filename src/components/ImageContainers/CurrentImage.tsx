import { AnimatePresence, motion } from "framer-motion";
import { useImageContext } from "../../context/ImageContext";

const CurrentImage = () => {
  const { usedImages } = useImageContext();
  const lastImage = usedImages[0];

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={lastImage.imageId}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2">
            {lastImage.title} by {lastImage.realName}
          </div>
          <div className="-mt-1">
            <img
              src={`https://live.staticflickr.com/${lastImage.serverId}/${lastImage.imageId}_${lastImage.picSecret}_b.jpg`}
              alt={lastImage.title}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute bottom-0 right-0 mb-2 mr-2">
            <div className="bg-gray-100 rounded text-xs px-2 py-1 opacity-25 hover:opacity-100 transition duration-300">
              <a
                href={lastImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline">
                Image Credits
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CurrentImage;
