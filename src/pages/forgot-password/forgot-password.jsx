import React from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../utils/auth";

const ForgotPassword = () => {
  const { values, errors, handleInputChange, isDisabled } =
    useValidation("form");
  const { resetPassword } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword(values.email);
  }

  return (
    <form className={`${styles.container} form`} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input
        type="email"
        placeholder="Укажите e-mail"
        value={values.email || ""}
        onChange={(e) => handleInputChange(e)}
        name={"email"}
        error={!!errors.email}
        errorText={errors.email}
        size={"default"}
        extraClass="mt-6 mb-6"
      />

      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        disabled={!isDisabled}
      >
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
    </form>
  );
};

export default ForgotPassword;
