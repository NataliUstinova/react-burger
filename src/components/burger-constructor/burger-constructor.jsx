import React from "react";
import burgerConstructor from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import {
  setConstructorIngredients,
  deleteConstructorIngredient,
} from "../../services/slices/ingredients.slice";
import { postOrder } from "../../services/slices/order.slice";

const BurgerConstructor = ({ openModal }) => {
  const dispatch = useDispatch();
  const { constructorIngredients, totalPrice } = useSelector(
    (state) => state.ingredients
  );

  const buns = constructorIngredients?.filter(
    (ingredient) => ingredient.type === "bun"
  );
  const middleIngredients = constructorIngredients?.filter(
    (ingredient) => ingredient.type !== "bun"
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

  function handleDelete(ingredient) {
    dispatch(deleteConstructorIngredient(ingredient.uniqueId));
  }

  const handleOrder = () => {
    const ingredientIds = constructorIngredients.map(
      (ingredient) => ingredient._id
    );

    dispatch(postOrder(ingredientIds))
      .unwrap()
      .then((order) => {
        openModal(order);
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
          {constructorIngredients.length > 0 &&
            middleIngredients.map((ingredient) => (
              <li
                key={ingredient.uniqueId}
                className={burgerConstructor.ingredientRow}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  handleClose={() => handleDelete(ingredient)}
                  type={ingredient.type}
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
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

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
