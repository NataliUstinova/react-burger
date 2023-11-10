import React, { useState } from "react";
import ingredientStyles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../../utils/data";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient, openModal }) => {
  const { image, name, price } = ingredient;
  const [counter, setCounter] = useState(0);
  function handleCounterClick() {
    setCounter((prev) => prev + 1);
    openModal({ ...ingredient, title: "Детали ингредиента" });
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  });

  return (
    <li
      ref={dragRef}
      className={ingredientStyles.ingredientBlock}
      onClick={handleCounterClick}
      style={{ opacity: opacity }}
    >
      {counter !== 0 && (
        <Counter
          count={counter}
          size={counter > 99 ? "small" : "default"}
          extraClass="m-1"
        />
      )}
      <img src={image} alt={name} className={ingredientStyles.image} />
      <div style={{ display: "flex" }}>
        <p className="text text_color_primary text_type_digits-default pr-2">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} text text_color_primary text_type_main-default pt-2`}
      >
        {name}
      </p>
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape(ingredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Ingredient;
