import React, { useEffect, useRef, useState } from "react";
import profileStyles from "./profile.module.css";
import { api } from "../../utils/api";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useValidation from "../../hooks/useValidation";
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from "../../services/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./nav/nav";
import useAuth from "../../utils/auth";

const Profile = () => {
  const { getUserData } = useAuth();
  useEffect(() => {
    getUserData();
  }, []);

  const [serverResponse, setServerResponse] = useState("");
  const [editMode, setEditMode] = useState(false);

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const { values, setValues, errors, handleInputChange } =
    useValidation("form");

  const {
    email: initialEmail,
    password: initialPassword,
    name: initialName,
  } = useSelector((store) => store.user);

  useEffect(() => {
    setValues({
      name: editMode ? values.name : initialName,
      password: editMode ? values.password : initialPassword,
      email: editMode ? values.email : initialEmail,
    });
  }, [editMode, initialName, initialPassword, initialEmail]);

  const dispatch = useDispatch();

  const handleEditClick = (ref) => {
    ref?.current?.focus();
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setValues({
      name: initialName,
      password: initialPassword,
      email: initialEmail,
    });
    setEditMode(false);
  };

  const handleSubmit = (e) => {
    setServerResponse("");
    e.preventDefault();
    if (
      values.password === initialPassword &&
      values.email === initialEmail &&
      values.name === initialName
    ) {
      alert("Нет изменений");
      return;
    }
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
          dispatch(setUserPassword(values.password));
          setServerResponse("Данные успешно обновлены");
          setEditMode(false);
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setTimeout(() => {
          setServerResponse("");
        }, 5000);
      });
  };

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
          onFocus={handleEditClick}
          onChange={(e) => handleInputChange(e)}
          onIconClick={() => {
            handleEditClick(nameRef);
          }}
        />
        <Input
          type="email"
          ref={emailRef}
          placeholder={"Email"}
          value={values.email || ""}
          name="email"
          icon={"EditIcon"}
          error={!!errors.email}
          errorText={errors.email}
          size={"default"}
          extraClass="mb-6"
          onFocus={handleEditClick}
          onChange={(e) => handleInputChange(e)}
          onIconClick={() => {
            handleEditClick(emailRef);
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
          icon={"EditIcon"}
          onFocus={handleEditClick}
          onIconClick={() => {
            handleEditClick(passwordRef);
          }}
        />
        {editMode && (
          <div className={profileStyles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button htmlType="submit">Save</Button>
          </div>
        )}
        <p className="pt-4 text_color_inactive text_type_main-small">
          {serverResponse}
        </p>
      </form>
    </div>
  );
};

export default Profile;
