import React from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input
        type="email"
        placeholder="Email"
        value={value}
        onChange={(e) => handleChange(e)}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6 mb-6"
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={value}
        onChange={(e) => handleChange(e)}
        icon={"ShowIcon"}
        onIconClick={() => {}}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button type="primary" size="medium" htmlType="submit">
        Войти
      </Button>

      <p className="mt-20 text_type_main-default text_color_inactive">
        Вы — новый пользователь?
        <Link
          to="/register"
          className={`${styles.link} ml-2 text_type_main-default text_color_accent`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="mt-4 text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link
          to="/forgot-password"
          className={`${styles.link} ml-2 text_type_main-default text_color_accent`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
