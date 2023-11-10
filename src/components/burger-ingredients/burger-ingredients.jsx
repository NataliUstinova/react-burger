import React, { useEffect, useMemo, useRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsRowBlock from "./components/ingredient-row-block/ingredient-row-block";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredients.slice";
import { setCurrentTab } from "../../services/slices/tabs.slice";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state) => state.tabs);
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  const TABS = ["Булки", "Соусы", "Начинки"];

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
    dispatch(setCurrentTab(tab)); // Dispatch the setCurrentTab action instead of using local state
    switch (tab) {
      case "Булки":
        bunsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Соусы":
        saucesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Начинки":
        mainsRef.current?.scrollIntoView({ behavior: "smooth" });
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
              title={TABS[0]}
              ingredients={buns}
              ref={bunsRef}
            />
            <IngredientsRowBlock
              title={TABS[1]}
              ingredients={sauces}
              ref={saucesRef}
            />
            <IngredientsRowBlock
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

export default BurgerIngredients;
