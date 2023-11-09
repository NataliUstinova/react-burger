import React, { Suspense } from "react";
import mainStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import PropTypes from "prop-types";

const Main = ({ openModal }) => {
  return (
    <div className={mainStyles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <main className={mainStyles.blocks}>
          <BurgerIngredients openModal={openModal} />
          {/*<BurgerConstructor openModal={openModal} />*/}
        </main>
      </Suspense>
    </div>
  );
};

Main.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Main;
