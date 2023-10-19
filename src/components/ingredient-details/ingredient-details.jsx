import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { ingredientPropTypes } from "../../utils/data";
import * as propTypes from "prop-types";
const IngredientDetails = ({ ingredient }) => {
  const { image, name, carbohydrates, fat, proteins, calories, title } =
    ingredient;
  return (
    <div className={ingredientDetailsStyles.container}>
      <h2
        className={`text text_color_primary text_type_main-large ${ingredientDetailsStyles.title}`}
      >
        {title}
      </h2>
      <img
        loading="lazy"
        src={image}
        alt={name}
        className={ingredientDetailsStyles.image}
      />
      <p
        className={`${ingredientDetailsStyles.name} text text_color_primary text_type_main-medium pt-1 pb-2`}
      >
        {name}
      </p>
      <div className={ingredientDetailsStyles.row}>
        <div className={ingredientDetailsStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Калории,ккал
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {calories}
          </p>
        </div>

        <div className={ingredientDetailsStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Белки, г
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {proteins}
          </p>
        </div>

        <div className={ingredientDetailsStyles.column}>
          <p className="text text_color_inactive text_type_main-default">
            Жиры, г
          </p>
          <p className="text text_color_inactive text_type_digits-default">
            {fat}
          </p>
        </div>

        <div className={ingredientDetailsStyles.column}>
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

IngredientDetails.propTypes = {
  ingredient: propTypes.shape(ingredientPropTypes).isRequired,
};

export default IngredientDetails;
