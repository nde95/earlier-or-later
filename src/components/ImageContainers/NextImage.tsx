import { AnimatePresence, motion } from "framer-motion";
import { useImageContext } from "../../context/ImageContext";
import { useState } from "react";
import ImageModal from "../Modals/ImageModal";

const NextImage = () => {
  const { newImages } = useImageContext();
  const comparisonImage = newImages[0];
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative font-Nunito">
      <AnimatePresence mode="wait">
        <motion.div
          key={comparisonImage._id}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2">
            {comparisonImage.title} by {comparisonImage.realName}
          </div>
          <div
            className="-mt-1 flex items-center justify-center h-64 overflow-hidden"
            onClick={() =>
              handleImageClick(
                `https://live.staticflickr.com/${comparisonImage.serverId}/${comparisonImage._id}_${comparisonImage.picSecret}_b.jpg`
              )
            }>
            <img
              src={`https://live.staticflickr.com/${comparisonImage.serverId}/${comparisonImage._id}_${comparisonImage.picSecret}_b.jpg`}
              alt={comparisonImage.title}
              className="object-cover cursor-pointer"
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

export default NextImage;
