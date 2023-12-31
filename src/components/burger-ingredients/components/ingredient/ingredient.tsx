import React, { useMemo } from "react";
import ingredientStyles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../../../services/slices/ingredients.slice";
import { modalTypes, openModal } from "../../../../services/slices/modal.slice";
import { Link, useLocation } from "react-router-dom";
import { TIngredientType } from "../../../../utils/types";

interface IngredientProps {
  ingredient: TIngredientType;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient }) => {
  const { image, name, price, _id } = ingredient;
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(
    (state: any) => state.ingredients
  );
  const location = useLocation();

  const counter = useMemo(
    () =>
      constructorIngredients.filter((item: TIngredientType) => item._id === _id)
        .length,
    [constructorIngredients, _id]
  );

  function handleClick() {
    dispatch(setCurrentIngredient(ingredient));
    dispatch(openModal({ modalType: modalTypes.INGREDIENT }));
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  });

  return (
    <Link
      key={_id}
      state={{ background: location }}
      to={`/ingredients/${_id}`}
      ref={dragRef}
      className={ingredientStyles.ingredientBlock}
      onClick={handleClick}
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
    </Link>
  );
};

export default Ingredient;
