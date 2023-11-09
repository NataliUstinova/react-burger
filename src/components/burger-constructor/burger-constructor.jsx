import React, { useContext, useEffect, useState } from "react";
import burgerConstructor from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";

const BurgerConstructor = ({ openModal }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { constructorIngredients, isLoading } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    console.log(constructorIngredients);
  }, [constructorIngredients]);

  const buns = constructorIngredients.filter(
    (ingredient) => ingredient.type === "bun"
  );
  const middleIngredients = constructorIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  useEffect(() => {
    let newTotalPrice = 0;
    newTotalPrice = buns[0]?.price * 2;
    middleIngredients.forEach((ingredient) => {
      newTotalPrice += ingredient.price;
      setTotalPrice(newTotalPrice);
    });
  }, [middleIngredients, buns]);

  let ingredientIds = [];
  if (constructorIngredients.length !== 0) {
    ingredientIds = [
      buns[0]?._id,
      ...middleIngredients?.map((ingredient) => ingredient._id),
    ];
  }
  function handleOrder() {
    api
      .postOrder(ingredientIds)
      .then((res) => {
        if (res.success) {
          openModal(res.order);
        }
      })
      .catch(console.error);
  }

  return (
    <section className={`${burgerConstructor.container} mt-15`}>
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

      <ul className={burgerConstructor.ingredientContainer}>
        {middleIngredients.map((ingredient) => (
          <li key={ingredient._id} className={burgerConstructor.ingredientRow}>
            <DragIcon type="primary" />
            <ConstructorElement
              type={ingredient.type}
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>

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
        />
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
