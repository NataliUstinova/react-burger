import React, { useEffect } from "react";
import profileStyles from "./profile.module.css";
import { api } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

const Profile = () => {
  console.log(getCookie("token"));

  useEffect(() => {
    api
      .getUser()
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={profileStyles.container}>
      <main></main>
    </div>
  );
};

export default Profile;
