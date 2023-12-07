import ingredientRowBlockStyles from "./ingredient-row-block.module.css";
import Ingredient from "../ingredient/ingredient";
import { forwardRef, Ref } from "react";
import { TIngredientType } from "../../../../utils/types";

interface IngredientsRowBlockProps {
  title: string;
  ingredients: TIngredientType[];
}

const IngredientsRowBlock = forwardRef(
  (
    { title, ingredients }: IngredientsRowBlockProps,
    ref: Ref<HTMLDivElement>
  ) => {
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
  }
);

export default IngredientsRowBlock;
