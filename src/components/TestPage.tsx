import { useState } from "react";
import AuthModal from "./Modals/AuthModal";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <button onClick={() => handleOpenModal()}>Click to login</button>
    </div>
  );
};

export default TestPage;
