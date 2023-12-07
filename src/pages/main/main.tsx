import React, { Suspense } from "react";
import mainStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main: React.FC = () => {
  return (
    <div className={mainStyles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <main className={mainStyles.blocks}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </Suspense>
    </div>
  );
};

export default Main;
