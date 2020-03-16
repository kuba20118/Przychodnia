import React from "react";
import { RoutesType } from "../routing/routes";
import { NavLink } from "react-router-dom";

type SidebarPropsType = {
  userRole: string;
  logoSrc: string;
  routes: RoutesType[];
};

const Sidebar: React.FC<SidebarPropsType> = ({
  userRole,
  logoSrc,
  routes
}: SidebarPropsType) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-img">
          <img src={logoSrc} alt="logo_image" />
        </div>
        <span className="simple-text logo-normal">{userRole}</span>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {routes.map((item, key) => {
            return (
              <NavLink
                to={item.layout + item.path}
                className="nav-link"
                activeClassName="active"
                key={key}
              >
                <i className="" />
                <p>{item.name}</p>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
