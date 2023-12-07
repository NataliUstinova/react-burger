import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  return (
    <div className={modalOverlayStyles.container} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
