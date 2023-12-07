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

const Profile: React.FC = () => {
  const { getUserData } = useAuth();
  useEffect(() => {
    getUserData();
  }, []);

  const [serverResponse, setServerResponse] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const { values, setValues, errors, handleInputChange } = useValidation({
    formClass: "form",
  });

  const {
    email: initialEmail,
    password: initialPassword,
    name: initialName,
  } = useSelector((store: any) => store.user);

  useEffect(() => {
    setValues({
      name: editMode ? values.name : initialName,
      password: editMode ? values.password : initialPassword,
      email: editMode ? values.email : initialEmail,
    });
  }, [editMode, initialName, initialPassword, initialEmail]);

  const dispatch = useDispatch();

  const handleEditClick = (ref: React.RefObject<HTMLInputElement> | null) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form
        className={profileStyles.formContainer}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          ref={nameRef}
          type="text"
          placeholder="Имя"
          value={String(values.name) || ""}
          name="name"
          icon={"EditIcon"}
          error={!!errors.name}
          errorText={String(errors.name)}
          size={"default"}
          extraClass="mb-6"
          onFocus={() => handleEditClick(nameRef)}
          onChange={(e) => handleInputChange(e)}
          onIconClick={() => handleEditClick(nameRef)}
        />
        <Input
          type="email"
          ref={emailRef}
          placeholder={"Email"}
          value={String(values.email) || ""}
          name="email"
          icon={"EditIcon"}
          error={!!errors.email}
          errorText={String(errors.email)}
          size={"default"}
          extraClass="mb-6"
          onFocus={() => handleEditClick(emailRef)}
          onChange={(e) => handleInputChange(e)}
          onIconClick={() => handleEditClick(emailRef)}
        />
        <Input
          type="password"
          ref={passwordRef}
          placeholder="Пароль"
          value={String(values.password) || ""}
          name={"password"}
          error={!!errors.password}
          errorText={String(errors.password)}
          size={"default"}
          extraClass="mb-6"
          onChange={(e) => handleInputChange(e)}
          icon={"EditIcon"}
          onFocus={() => handleEditClick(passwordRef)}
          onIconClick={() => handleEditClick(passwordRef)}
        />
        {editMode && (
          <div className={profileStyles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              onClick={() => handleCancelClick()}
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
