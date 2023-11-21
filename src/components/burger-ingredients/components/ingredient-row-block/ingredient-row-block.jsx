import ingredientRowBlockStyles from "./ingredient-row-block.module.css";
import Ingredient from "../ingredient/ingredient";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../../utils/types";
const IngredientsRowBlock = forwardRef(({ title, ingredients }, ref) => {
  return (
    <div ref={ref} className={ingredientRowBlockStyles.container}>
      <p className="text text_color_primary text_type_main-medium pb-6 pt-10">
        {title}
      </p>
      <ul className={`${ingredientRowBlockStyles.ingredientsRow} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <Ingredient ingredient={ingredient} key={ingredient._id} />
        ))}
      </ul>
    </div>
  );
});

IngredientsRowBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)),
};

export default IngredientsRowBlock;
