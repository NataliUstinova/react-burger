import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
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
