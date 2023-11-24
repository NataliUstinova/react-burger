import React, { useEffect } from "react";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import useAuth from "../../utils/auth";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const { values, setValues, errors, handleInputChange, isDisabled } =
    useValidation("form");
  const { confirmResetPassword } = useAuth();
  const { resetRequestSent } = useSelector((store) => store.user);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    confirmResetPassword(values.password, values.token.trim());
  }

  useEffect(() => {
    !resetRequestSent && navigate("/forgot-password");
  }, []);

  return (
    <form className={`${styles.container} form`} onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input
        type={values.showPassword ? "text" : "password"}
        placeholder="Введите новый пароль"
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
        extraClass="mt-6 mb-6"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        value={values.token || ""}
        onChange={(e) => handleInputChange(e)}
        name="token"
        error={!!errors.token}
        errorText={errors.token}
        size={"default"}
        extraClass="mb-6"
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        disabled={!isDisabled}
      >
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
    </form>
  );
};

export default ResetPassword;
