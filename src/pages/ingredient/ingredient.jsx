import React from "react";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";

const Ingredient = () => {
  const { id } = useParams();
  return (
    <div className={styles.ingredientContainer}>
      <p>Страница ингредиента {id}</p>
    </div>
  );
};

export default Ingredient;
