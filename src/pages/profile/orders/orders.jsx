import React from "react";
import styles from "./orders.module.css";
import Nav from "../nav/nav";
const Orders = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <h1 className={styles.orders}>Orders</h1>
    </div>
  );
};

export default Orders;
