import React from "react";
import appHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "./components/nav-link/nav-link";

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.container} m-10`}>
      <nav className={appHeaderStyles.navList}>
        <div className={appHeaderStyles.navListContainer}>
          <NavigationLink
            to="/"
            title="Конструктор"
            children={<BurgerIcon type="secondary" />}
          />
          <NavigationLink
            to="/order-feed"
            title="Лента заказов"
            children={<ListIcon type="secondary" />}
          />
        </div>
        <Logo />
        <NavigationLink
          to="/profile"
          title="Личный кабинет"
          children={<ProfileIcon type="secondary" />}
        />
      </nav>
    </header>
  );
};

export default AppHeader;
