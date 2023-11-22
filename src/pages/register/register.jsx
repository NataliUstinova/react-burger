import React, { useEffect } from "react";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../utils/auth";

const Register = () => {
  const { values, setValues, errors, handleInputChange, isDisabled } =
    useValidation("form");

  const { handleRegister, authCheck } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.email, values.password, values.name);
  }

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <form className={`${styles.container} form`} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input
        type="text"
        placeholder="Имя"
        value={values.name || ""}
        onChange={(e) => handleInputChange(e)}
        name="name"
        error={!!errors.name}
        errorText={errors.name}
        size={"default"}
        extraClass="mt-6 mb-6"
      />
      <Input
        type="email"
        placeholder="Email"
        value={values.email || ""}
        onChange={(e) => handleInputChange(e)}
        name="email"
        error={!!errors.email}
        errorText={errors.email}
        size={"default"}
        extraClass="mb-6"
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
        Зарегистрироваться
      </Button>

      <p className="mt-20 text_type_main-default text_color_inactive">
        Уже зарегистрированы?
        <Link
          to="/login"
          className={`${styles.link} ml-2 text_type_main-default text_color_accent`}
        >
          Войти
        </Link>
      </p>
    </form>
  );
};

export default Register;
