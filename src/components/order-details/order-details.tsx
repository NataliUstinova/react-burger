import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import { Done } from "../../images";
import { useSelector } from "react-redux";

const OrderDetails: React.FC = () => {
  const order = useSelector((state: any) => state.order);

  return (
    <>
      <h2
        className={`text text_color_primary text_type_digits-large pt-15 ${orderDetailsStyles.textGlow}`}
      >
        {order.number}
      </h2>
      <p className="text text_color_primary text_type_main-medium pt-2">
        идентификатор заказа
      </p>
      <img
        loading="lazy"
        src={Done}
        alt="checkmark"
        className={`${orderDetailsStyles.checkmark} pt-15 pb-15`}
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

export default OrderDetails;
