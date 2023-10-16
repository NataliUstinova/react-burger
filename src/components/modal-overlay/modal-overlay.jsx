import React, { useEffect } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  return (
    <div className={modalOverlayStyles.container} onClick={onClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
