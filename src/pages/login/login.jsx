import React from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../utils/auth";

const Login = () => {
  const { values, setValues, errors, handleInputChange, isDisabled } =
    useValidation("form");
  const { handleLogin } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  return (
    <form className={`${styles.container} form`} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input
        type="email"
        placeholder="Email"
        value={values.email || ""}
        onChange={(e) => handleInputChange(e)}
        name={"email"}
        error={!!errors.email}
        errorText={errors.email}
        size={"default"}
        extraClass="mt-6 mb-6"
      />
      <Input
        type={values.showPassword ? "text" : "password"}
        placeholder="Пароль"
        value={values.password || ""}
        onChange={(e) => handleInputChange(e)}
        icon={"ShowIcon"}
        onIconClick={() => {
          setValues((prevValues) => ({
            ...prevValues,
            showPassword: !prevValues.showPassword,
          }));
        }}
        name={"password"}
        error={!!errors.password}
        errorText={errors.password}
        size={"default"}
        extraClass="mb-6"
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        disabled={!isDisabled}
      >
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
    </form>
  );
};

export default Login;
