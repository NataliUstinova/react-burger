import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <h1 className="text_color_primary text_type_main-default">
      Страница не найдена{" "}
      <Link to={".."} className="text_type_main-default text_color_accent">
        назад
      </Link>
    </h1>
  );
};

export default Error404;
