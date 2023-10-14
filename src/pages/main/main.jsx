import React from 'react';
import mainStyles from './main.module.css'
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {mockData} from "../../utils/data";

const Main = () => {
  return (
    <div className={mainStyles.container}>
    <AppHeader />
    <main className={mainStyles.blocks}>
      <BurgerIngredients data={mockData} />
      <BurgerConstructor data={mockData} />
    </main>
    </div>
  );
};

export default Main;
