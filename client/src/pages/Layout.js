import React, { useState } from "react";
import "./layout.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Avatar, notification } from "antd";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  console.log(user);
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
      path: "/apply-docter",
      icon: "ri-hospital-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/usersList",
      icon: "ri-file-list-fill",
    },
    {
      name: "Docters",
      path: "/admin/doctersList",
      icon: "ri-hospital-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const docterMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/docter/appointments",
      icon: "ri-file-list-fill",
    },
    { 
      name: "Profile",
      path: `/docter/profile/${user?._id}`,
      icon: "ri-profile-fill",
    },
  ];

  const notification = () => {
    navigate("./notifications");
  };

  const renderedMenu = user?.isAdmin
    ? adminMenu
    : user?.isDocter
    ? docterMenu
    : userMenu;

  const role = user?.isAdmin ? "admin" : user?.isDocter ? "docter" : "user";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1 className="white"> DA - {role}</h1>
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
              <div
                className={`d-flex menu-item`}
                onClick={() => {
                  localStorage.clear();
                  Navigator("/login");
                }}
              >
                <i className="ri-logout-circle-line"></i>
                {!collapsed && <Link to="/login">Logout </Link>}
              </div>
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
              <Badge
                className="badge"
                count={user?.unseenNotifications.length}
                onClick={notification}
              >
                <i className="ri-notification-line header-action-icon px-2"></i>
              </Badge>
              <Link className="anchor px-2" to="./profile">
                {user?.name}{" "}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
