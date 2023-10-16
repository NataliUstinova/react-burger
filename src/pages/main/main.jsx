import React from "react";
import mainStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { ingredientPropTypes } from "../../utils/data";
import PropTypes from "prop-types";

const Main = ({ data, isLoading }) => {
  return (
    <div className={mainStyles.container}>
      {!isLoading && data[0] ? (
        <main className={mainStyles.blocks}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Main;
