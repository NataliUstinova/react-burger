import React, { useEffect } from "react";
import modalStyles from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const { isOpen } = useSelector((state: any) => state.modal);

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
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
  }, [isOpen, onClose]);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`${modalStyles.container} pt-15 pb-15 pl-10 pr-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals")!
  );
};

export default Modal;
