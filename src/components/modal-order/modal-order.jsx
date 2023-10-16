import React from "react";
import modalOderStyles from "./modal-order.module.css";
import { Done } from "../../images";
import PropTypes from "prop-types";
import { orderPropTypes } from "../../utils/data";

const ModalOrder = ({ order }) => {
  return (
    <>
      <h2
        className={`text text_color_primary text_type_digits-large pt-15 ${modalOderStyles.textGlow}`}
      >
        {order.number}
      </h2>
      <p className="text text_color_primary text_type_main-medium pt-2">
        идентификатор заказа
      </p>
      <img
        src={Done}
        alt="checkmark"
        className={`${modalOderStyles.checkmark} pt-15 pb-15`}
      />
      <p className="text text_color_primary text_type_main-default pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_color_inactive text_type_main-default pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

ModalOrder.propTypes = {
  order: PropTypes.shape(orderPropTypes),
};
export default ModalOrder;
