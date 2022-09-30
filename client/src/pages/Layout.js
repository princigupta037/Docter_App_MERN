import React, { useState } from "react";
import "./layout.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-fill",
    },
    {
      name: "Apply Docter",
      path: "/applydocter",
      icon: "ri-hospital-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-fill",
    },
  ];

  const renderedMenu = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1> DA</h1>
            <div className="menu">
              {renderedMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name} </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-close-fill close-icon header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
             <div className="d-flex align-items-center px-2">
            <i className="ri-notification-line header-action-icon px-3">
              <Link className='anchor px-3' to='./profile'>{user?.name} </Link></i>
          </div>

          </div>

         
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
