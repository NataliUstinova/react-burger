import React from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
function App() {
  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order-feed" element={<OrderFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
