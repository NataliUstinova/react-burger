import React from 'react';
import mainStyles from './main.module.css'
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const Main = () => {
  return (
    <div className={mainStyles.container}>
    <AppHeader />
    <main>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
    </div>
  );
};

export default Main;
