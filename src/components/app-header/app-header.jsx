import React from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "./components/nav-link/nav-link";

const AppHeader = () => {
  return (
    <header className={`${styles.container} m-10`}>
      <nav className={styles.navList}>
        <div className={styles.navListContainer}>
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
  )
};

export default AppHeader;
