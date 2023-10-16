import React from "react";
import burgerConstructor from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/data";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ data, toggleModal }) => {
  const [firstIngredient, ...middleIngredients] = data;
  const lastIngredient = middleIngredients.pop();
  const order = { number: 568234 };
  return (
    <section className={`${burgerConstructor.container} mt-15`}>
      <div
        className={`mr-4 ${burgerConstructor.ingredientRow} ${burgerConstructor.ingredientRow_disabled}`}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${firstIngredient.name} (верх)`}
          price={firstIngredient.price}
          thumbnail={firstIngredient.image}
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
          text={`${lastIngredient.name} (низ)`}
          price={lastIngredient.price}
          thumbnail={lastIngredient.image}
        />
      </div>

      <div className={`mt-10 ${burgerConstructor.btnContainer}`}>
        <p className="text text_color_primary text_type_digits-medium pr-2">
          610
        </p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          children="Оформить заказ"
          extraClass="ml-10"
          onClick={() => toggleModal(order)}
        />
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
