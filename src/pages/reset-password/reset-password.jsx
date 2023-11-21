import React from "react";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input
        type="password"
        placeholder="Введите новый пароль"
        value={value}
        onChange={(e) => handleChange(e)}
        icon={"ShowIcon"}
        onIconClick={() => {}}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6 mb-6"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        value={value}
        onChange={(e) => handleChange(e)}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button type="primary" size="medium" htmlType="submit">
        Сохранить
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

export default ResetPassword;
