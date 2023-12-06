import React, { useState, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import navLinkStyles from "./nav-link.module.css";

interface NavigationLinkProps {
  to: string;
  title: string;
  children: ReactElement;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  title,
  children,
}) => {
  const [isGroupHovered, setIsGroupHovered] = useState(false);

  const handleGroupMouseEvent = () => {
    setIsGroupHovered(!isGroupHovered);
  };

  const cloneChildWithProps = (isActive: boolean, children: ReactElement) => {
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
      {({ isActive }: { isActive: boolean }) => (
        <>
          {cloneChildWithProps(isActive, children)}
          <p
            className={`pl-2 text text_type_main-default 
          ${
            isActive || isGroupHovered
              ? "text_color_primary"
              : "text_color_inactive"
          }
          `}
          >
            {title}
          </p>
        </>
      )}
    </NavLink>
  );
};

export default NavigationLink;
