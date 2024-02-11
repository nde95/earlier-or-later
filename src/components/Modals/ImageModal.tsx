import Modal from "./Modal";

interface ImageModalProps {
  onClose: () => void;
  isOpen?: boolean;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex justify-center items-center">
        <img alt="User Image" className="object-cover" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
