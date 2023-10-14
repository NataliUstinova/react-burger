import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/data";

const BurgerConstructor = ({ data }) => (
  <section className={styles.container}>
  </section>
);

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired
};

export default BurgerConstructor;
