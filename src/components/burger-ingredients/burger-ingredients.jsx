import React, {useRef, useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {mockData} from "../../utils/data";
import IngredientsRowBlock from "./components/ingredient-row-block/ingredient-row-block";

const BurgerIngredients = () => {
  const TABS = ['Булки', 'Соусы', 'Начинки']
  const [currentTab, setCurrentTab] = useState(TABS[0])
  const buns = mockData.filter(item => item.type === 'bun')
  const sauces = mockData.filter(item => item.type === 'sauce')
  const mains = mockData.filter(item => item.type === 'main')

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case TABS[0]:
        bunsRef?.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case TABS[1]:
        saucesRef?.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case TABS[2]:
        mainsRef?.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };
  
  return (
  <section className={styles.container}>
    <h1 className="text text_color_primary text_type_main-large pb-5">Соберите бургер</h1>
    <div className={styles.tabs}>
      {TABS.map((tab, index) => <Tab
                                            key={index}
                                            value={tab}
                                            active={currentTab === tab}
                                            onClick={() => handleTabClick(tab)}
                                            children={tab}
                                        />)}
    </div>
    <section className={styles.ingredientContainer}>
      <IngredientsRowBlock title={TABS[0]} ingredients={buns} ref={bunsRef} />
      <IngredientsRowBlock title={TABS[1]} ingredients={sauces} ref={saucesRef} />
      <IngredientsRowBlock title={TABS[2]} ingredients={mains} ref={mainsRef} />
    </section>
  </section>
  )
};

export default BurgerIngredients;
