import React, { useEffect, useRef } from "react";
import profileStyles from "./profile.module.css";
import { api } from "../../utils/api";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import useValidation from "../../hooks/useValidation";
import { setUserEmail, setUserName } from "../../services/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./nav/nav";

const Profile = () => {
  useEffect(() => {
    api
      .getUser()
      .then((res) => {
        if (res.success) {
          dispatch(setUserName(res.user.name));
          dispatch(setUserEmail(res.user.email));
        }
      })
      .catch(console.error);
  }, []);
  const [serverResponse, setServerResponse] = React.useState("");

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const { values, setValues, errors, handleInputChange } =
    useValidation("form");

  const { email, password, name } = useSelector((store) => store.user);

  useEffect(() => {
    setValues({ name: name, password: password, email: email });
  }, [email, password, name]);

  const dispatch = useDispatch();
  function handleSubmit(e) {
    setServerResponse("");
    e.preventDefault();
    api
      .updateUser({
        email: values.email,
        password: values.password,
        name: values.name,
      })
      .then((res) => {
        console.log(res);
        if (res.success) {
          dispatch(setUserName(res.user.name));
          dispatch(setUserEmail(res.user.email));
          setServerResponse("Данные успешно обновлены");
        }
      })
      .catch((err) => alert(err))
      .finally(() => {
        setTimeout(() => {
          setServerResponse("");
        }, 5000);
      });
  }

  return (
    <div className={profileStyles.container}>
      <Nav />
      <form className={profileStyles.formContainer} onSubmit={handleSubmit}>
        <Input
          ref={nameRef}
          type="text"
          placeholder="Имя"
          value={values.name || ""}
          name="name"
          icon={"EditIcon"}
          error={!!errors.name}
          errorText={errors.name}
          size={"default"}
          extraClass="mb-6"
          onChange={(e) => handleInputChange(e)}
          onIconClick={() => {
            nameRef.current.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          onBlur={(e) => handleSubmit(e)}
        />
        <Input
          type="email"
          ref={emailRef}
          placeholder={"Email"}
          value={values.email || ""}
          name="email"
          icon={"EditIcon"}
          onIconClick={() => {
            emailRef.current.focus();
          }}
          error={!!errors.email}
          errorText={errors.email}
          size={"default"}
          extraClass="mb-6"
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleSubmit(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <Input
          type="password"
          ref={passwordRef}
          placeholder="Пароль"
          value={values.password || ""}
          name={"password"}
          error={!!errors.password}
          errorText={errors.password}
          size={"default"}
          extraClass="mb-6"
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleSubmit(e)}
          icon={"EditIcon"}
          onIconClick={() => {
            passwordRef.current.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <p className="pt-4 text_color_inactive text_type_main-small">
          {serverResponse}
        </p>
      </form>
    </div>
  );
};

export default Profile;
