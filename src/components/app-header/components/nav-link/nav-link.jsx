import React, {useState} from 'react';
import navLinkStyles from "./nav-link.module.css";
import {NavLink} from "react-router-dom";

const NavigationLink = ({ to, title, children }) => {
  const [isGroupHovered, setIsGroupHovered] = useState(false);
  const handleGroupMouseEvent = () => {
    setIsGroupHovered(!isGroupHovered);
  };
  
  const cloneChildWithProps = (isActive, children) => {
    return React.cloneElement(children, { 
      type: isActive || isGroupHovered ? "primary" : "secondary",
    });
  };
  
  return (
    <NavLink
      to={to}
      className={`${navLinkStyles.navListItem} pt-4 pb-4 pl-5 pr-5`}
      onMouseEnter={handleGroupMouseEvent}
      onMouseLeave={handleGroupMouseEvent}
    >
      {({ isActive }) => (
        <>
          {cloneChildWithProps(isActive, children)}
          <p className={`pl-2 text text_type_main-default 
          ${isActive || isGroupHovered ? "text_color_primary" : "text_color_inactive"}
          `}>
            {title}
          </p>
        </>
      )}
    </NavLink>
  );
};

export default NavigationLink;
