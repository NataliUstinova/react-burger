import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/main/main";
import OrderFeed from "./pages/order-feed/order-feed";
import Profile from "./pages/profile/profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/order-feed" element={<OrderFeed />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </>
  );
}

export default App;
