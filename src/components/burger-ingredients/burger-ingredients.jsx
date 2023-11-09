import React, { useMemo, useRef, useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsRowBlock from "./components/ingredient-row-block/ingredient-row-block";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerIngredients = ({ openModal }) => {
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  const TABS = ["Булки", "Соусы", "Начинки"];
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const buns = useMemo(
    () => ingredients && ingredients?.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients && ingredients?.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients && ingredients?.filter((item) => item.type === "main"),
    [ingredients]
  );

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case TABS[0]:
        bunsRef?.current.scrollIntoView({ behavior: "smooth" });
        break;
      case TABS[1]:
        saucesRef?.current.scrollIntoView({ behavior: "smooth" });
        break;
      case TABS[2]:
        mainsRef?.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1 className="text text_color_primary text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyles.tabs}>
        {TABS.map((tab, index) => (
          <Tab
            key={index}
            value={tab}
            active={currentTab === tab}
            onClick={() => handleTabClick(tab)}
            children={tab}
          />
        ))}
      </div>
      <section className={burgerIngredientsStyles.ingredientContainer}>
        {!isLoading && ingredients?.length > 0 && (
          <>
            <IngredientsRowBlock
              openModal={openModal}
              title={TABS[0]}
              ingredients={buns}
              ref={bunsRef}
            />
            <IngredientsRowBlock
              openModal={openModal}
              title={TABS[1]}
              ingredients={sauces}
              ref={saucesRef}
            />
            <IngredientsRowBlock
              openModal={openModal}
              title={TABS[2]}
              ingredients={mains}
              ref={mainsRef}
            />
          </>
        )}
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
