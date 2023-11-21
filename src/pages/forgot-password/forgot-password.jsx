import React from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input
        type="email"
        placeholder="Укажите e-mail"
        value={value}
        onChange={(e) => handleChange(e)}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6 mb-6"
      />

      <Button type="primary" size="medium" htmlType="submit">
        Восстановить
      </Button>

      <p className="mt-20 text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link
          to="/login"
          className={`${styles.link} ml-2 text_type_main-default text_color_accent`}
        >
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
