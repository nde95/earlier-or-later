import { AnimatePresence, motion } from "framer-motion";
import { useImageContext } from "../../context/ImageContext";
import ImageModal from "../Modals/ImageModal";
import { useState } from "react";

const CurrentImage = () => {
  const { usedImages } = useImageContext();
  const lastImage = usedImages[0];
  const trimmedDate = lastImage.takenDate.toString().substring(0, 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  const handleImageClick = (imageSrc: any) => {
    setSelectedImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={lastImage._id}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2">
            {lastImage.title} by {lastImage.realName}
          </div>
          <div
            className="-mt-1 flex items-center justify-center h-64 overflow-hidden"
            onClick={() =>
              handleImageClick(
                `https://live.staticflickr.com/${lastImage.serverId}/${lastImage._id}_${lastImage.picSecret}_b.jpg`
              )
            }>
            <img
              src={`https://live.staticflickr.com/${lastImage.serverId}/${lastImage._id}_${lastImage.picSecret}_b.jpg`}
              alt={lastImage.title}
              className="object-cover cursor-pointer"
            />
          </div>
          <div
            className="-mb-1 absolute bottom-0 left-0 p-2 text-center rounded-md bg-gray-800 text-white opacity-75"
            style={{ fontSize: "0.8rem" }}>
            Taken on: {trimmedDate}
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
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        src={selectedImageSrc}
      />
    </div>
  );
};

export default CurrentImage;
