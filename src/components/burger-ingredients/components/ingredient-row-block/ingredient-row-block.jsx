import styles from "./ingredient-row-block.module.css";
import Ingredient from "../ingredient/ingredient";
import {forwardRef} from "react";

const IngredientsRowBlock = forwardRef(({ title, ingredients }, ref) => (
  <div ref={ref} className={styles.container}>
    <p ref={ref} className="text text_color_primary text_type_main-medium pb-6 pt-10">{title}</p>
    <ul className={`${styles.ingredientsRow} pl-4 pr-4`}>
      {ingredients.map(item => <Ingredient {...item} key={item._id}/>)}
    </ul>
  </div>
));

export default IngredientsRowBlock;