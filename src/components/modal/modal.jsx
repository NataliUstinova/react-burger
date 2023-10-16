import React from "react";
import modalStyles from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientPropTypes, orderPropTypes } from "../../utils/data";

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${modalStyles.container} pt-15 pb-15 pl-10 pr-10`}>
        <div
          className={
            data.name
              ? modalStyles.headerContainerSb
              : modalStyles.headerContainerEnd
          }
        >
          {data.name && (
            <h2 className="text text_color_primary text_type_main-large">
              Детали ингредиента
            </h2>
          )}
          <div className={modalStyles.closeButton}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {data.name && <IngredientDetails ingredient={data} />}
        {data.number && <OrderDetails order={data} />}
      </div>
    </ModalOverlay>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape(ingredientPropTypes),
    PropTypes.shape(orderPropTypes),
  ]),
};

export default Modal;
