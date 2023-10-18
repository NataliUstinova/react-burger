import React, { useEffect } from "react";
import modalStyles from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ isOpen, onClose, data, children }) => {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${modalStyles.container} pt-15 pb-15 pl-10 pr-10`}>
        <div
          className={
            data?.name
              ? modalStyles.headerContainerSb
              : modalStyles.headerContainerEnd
          }
        >
          {data?.name && (
            <h2 className="text text_color_primary text_type_main-large">
              {data.title}
            </h2>
          )}
          <div className={modalStyles.closeButton}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;