import React from "react";
import modalIngredientStyles from "./modal-ingredient.module.css";
import { ingredientPropTypes } from "../../utils/data";
import * as propTypes from "prop-types";
const ModalIngredient = ({ ingredient }) => {
  const { image, name, carbohydrates, fat, proteins, calories } = ingredient;
  return (
    <div>
      <img
        src={image}
        alt="ingredient"
        className={modalIngredientStyles.image}
      />
      <p
        className={`${modalIngredientStyles.name} text text_color_primary text_type_main-medium pt-1 pb-2`}
      >
        {name}
      </p>
      <div className={modalIngredientStyles.row}>
        <div className={modalIngredientStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Калории,ккал
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {calories}
          </p>
        </div>

        <div className={modalIngredientStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Белки, г
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {proteins}
          </p>
        </div>

        <div className={modalIngredientStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Жиры, г
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {fat}
          </p>
        </div>

        <div className={modalIngredientStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Углеводы, г
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

ModalIngredient.propTypes = {
  ingredient: propTypes.shape(ingredientPropTypes).isRequired,
};

export default ModalIngredient;
