import React from 'react';
import orderFeedStyles from "./order-feed.module.css";
import AppHeader from "../../components/app-header/app-header";

const OrderFeed = () => {
  return (
    <div className={orderFeedStyles.container}>
      <AppHeader />
      <main>
      </main>
    </div>
  );
};

export default OrderFeed;
