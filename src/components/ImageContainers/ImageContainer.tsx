import { AnimatePresence, motion } from "framer-motion";
import { useImageContext } from "../../context/ImageContext";
import { ImageModal } from "../Modals";
import { useState } from "react";

interface ImageContainerProps {
  isCurrentImage: boolean;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ isCurrentImage }) => {
  const { currentImage, newImages } = useImageContext();
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
      <AnimatePresence mode="wait">
        {isCurrentImage ? (
          <motion.div
            key={currentImage[0].id}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2 font-Nunito">
              {currentImage[0].title} by{" "}
              {currentImage[0].real_name === ""
                ? currentImage[0].username
                : currentImage[0].real_name}
            </div>
            <div
              className="-mt-1 flex items-center justify-center h-64 overflow-hidden"
              onClick={() =>
                handleImageClick(
                  `https://live.staticflickr.com/${currentImage[0].server_id}/${currentImage[0].image_id}_${currentImage[0].image_secret}_b.jpg`
                )
              }>
              <img
                src={`https://live.staticflickr.com/${currentImage[0].server_id}/${currentImage[0].image_id}_${currentImage[0].image_secret}_b.jpg`}
                alt={currentImage[0].title}
                className="object-cover cursor-pointer"
              />
            </div>
            <div
              className="-mb-1 absolute bottom-0 left-0 p-2 text-center rounded-md bg-gray-800 text-white opacity-75"
              style={{ fontSize: "0.8rem" }}>
              Taken on: {currentImage[0].taken_date.toString()}
            </div>
            <div className="absolute bottom-0 right-0 mb-2 mr-2">
              <div className="bg-gray-100 rounded text-xs px-2 py-1 opacity-25 hover:opacity-100 transition duration-300">
                <a
                  href={currentImage[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
                  Image Credits
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={comparisonImage.id}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="bg-[#F6BD60] rounded-md text-xs text-center p-2 font-Nunito">
              {comparisonImage.title} by{" "}
              {comparisonImage.real_name === ""
                ? comparisonImage.username
                : comparisonImage.real_name}
            </div>
            <div
              className="-mt-1 flex items-center justify-center h-64 overflow-hidden"
              onClick={() =>
                handleImageClick(
                  `https://live.staticflickr.com/${comparisonImage.server_id}/${comparisonImage.image_id}_${comparisonImage.image_secret}_b.jpg`
                )
              }>
              <img
                src={`https://live.staticflickr.com/${comparisonImage.server_id}/${comparisonImage.image_id}_${comparisonImage.image_secret}_b.jpg`}
                alt={comparisonImage.title}
                className="object-cover cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        src={selectedImageSrc}
      />
    </div>
  );
};

export default ImageContainer;
