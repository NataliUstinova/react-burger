import React, { useEffect } from "react";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../services/slices/ingredients.slice";
import { TIngredientType } from "../../utils/types";

const Ingredient: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients, currentIngredient } = useSelector(
    (state: any) => state.ingredients
  );

  useEffect(() => {
    if (ingredients?.length !== 0) {
      dispatch(
        setCurrentIngredient(
          ingredients?.find((item: TIngredientType) => item._id === id)
        )
      );
    }
  }, [id, ingredients, dispatch]);

  return (
    <div className={styles.ingredientContainer}>
      {currentIngredient?.name && <IngredientDetails />}
    </div>
  );
};

export default Ingredient;
