import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
const IngredientDetails = () => {
  const { currentIngredient } = useSelector((state) => state.ingredients);
  const { image, name, carbohydrates, fat, proteins, calories } =
    currentIngredient;
  return (
    <div className={ingredientDetailsStyles.container}>
      <h2
        className={`text text_color_primary text_type_main-large ${ingredientDetailsStyles.title}`}
      >
        Детали ингредиента
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

export default IngredientDetails;
