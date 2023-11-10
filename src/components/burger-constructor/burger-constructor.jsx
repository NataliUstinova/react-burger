import React from "react";
import burgerConstructor from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import { setConstructorIngredients } from "../../services/slices/ingredients.slice";
import { postOrder } from "../../services/slices/order.slice";
import { modalTypes, openModal } from "../../services/slices/modal.slice";
import ConstructorElementWrapper from "./components/constructor-element-wrapper/constructor-element-wrapper";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorIngredients, middleIngredients, totalPrice } = useSelector(
    (state) => state.ingredients
  );

  const buns = constructorIngredients?.filter(
    (ingredient) => ingredient.type === "bun"
  );

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (item) => {
      dispatch(setConstructorIngredients({ ...item, uniqueId: uuid() }));
    },
  });

  const handleOrder = () => {
    const ingredientIds = constructorIngredients.map(
      (ingredient) => ingredient._id
    );

    dispatch(postOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(openModal({ modalType: modalTypes.ORDER }));
      })
      .catch((error) => console.error("Order post failed:", error));
  };

  return (
    <section className={`${burgerConstructor.block} mt-15`}>
      <div
        className={`${burgerConstructor.container} ${
          isHover ? burgerConstructor.containerOnHover : ""
        }`}
        ref={dropTargetRef}
      >
        {buns[0] && (
          <div
            className={`mr-4 ${burgerConstructor.ingredientRow} ${burgerConstructor.ingredientRow_disabled}`}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns[0]?.name} (верх)`}
              price={buns[0]?.price}
              thumbnail={buns[0]?.image}
            />
          </div>
        )}
        <ul className={burgerConstructor.ingredientContainer}>
          {middleIngredients.map((ingredient, index) => (
            <ConstructorElementWrapper
              key={uuid()}
              item={ingredient}
              index={index}
            />
          ))}
        </ul>

        {buns[0] && (
          <div
            className={`mr-4 ${burgerConstructor.ingredientRow} ${burgerConstructor.ingredientRow_disabled}`}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns[0]?.name} (низ)`}
              price={buns[0]?.price}
              thumbnail={buns[0]?.image}
            />
          </div>
        )}
      </div>
      <div className={`mt-10 ${burgerConstructor.btnContainer}`}>
        <p className="text text_color_primary text_type_digits-medium pr-2">
          {totalPrice}
        </p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          children="Оформить заказ"
          extraClass="ml-10"
          onClick={handleOrder}
          disabled={constructorIngredients.length === 0}
        />
      </div>
    </section>
  );
};

export default BurgerConstructor;
