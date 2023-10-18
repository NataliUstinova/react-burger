import React, { Suspense } from "react";
import mainStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { ingredientPropTypes } from "../../utils/data";
import PropTypes, { shape } from "prop-types";

const Main = ({ data, closeModal, openModal }) => {
  return (
    <div className={mainStyles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        {data[0] && (
          <main className={mainStyles.blocks}>
            <BurgerIngredients openModal={openModal} data={data} />
            <BurgerConstructor openModal={openModal} data={data} />
          </main>
        )}
      </Suspense>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(shape(ingredientPropTypes)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Main;
