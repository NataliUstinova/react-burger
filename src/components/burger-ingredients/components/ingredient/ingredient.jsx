import React, {useState} from 'react';
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = ({image, name, price}) => {
  const [counter, setCounter] = useState(0)
  function handleCounterClick() {
    setCounter(prev => prev + 1)
  }
  return (
    <li className={styles.ingredientBlock} onClick={handleCounterClick}>
      {counter !== 0 && <Counter count={counter} size={counter > 99 ? "small" : "default"} extraClass="m-1"/>}
      <img src={image} alt="" className={styles.image}/>
      <div style={{ display: "flex"}}>
        <p className="text text_color_primary text_type_digits-default pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_color_primary text_type_main-default pt-2`}>{name}</p>
    </li>
  );
};

export default Ingredient;
