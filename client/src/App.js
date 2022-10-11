import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplyDocter from "./pages/ApplyDocter";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notifications from "./pages/Notifications";
import DoctersList from "./pages/Admin/DoctersList";
import UserList from "./pages/Admin/UserList";
import Profile from "./pages/Docter/Profile";
import BookAppointment from "./pages/Docter/BookAppointment";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoutes>
                <Login />
              // </ProtectedRoutes>
            }
          />
           <Route
            path="/"
            element={
              // <ProtectedRoutes>
                <BookAppointment />
              // </ProtectedRoutes>
            }
          />
         
          <Route
            path="/user/home"
            element={
              // <ProtectedRoutes>
                <Home />
              // </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard"
            element={
              // <PublicRoutes>
                <Dashboard />
              // </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              // <PublicRoutes>
                <Login />
              // </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              // <PublicRoutes>
                <Register />
              // </PublicRoutes>
            }
          />
          <Route
            path="/apply-docter"
            element={
              // <PublicRoutes>
                <ApplyDocter />
              // </PublicRoutes>
            }
          />
            <Route
            path="/login/notifications"
            element={
              // <PublicRoutes>
                <Notifications />
              // </PublicRoutes>
            }
            
          />
          <Route
            path="/admin/doctersList"
            element={
              // <PublicRoutes>
                <DoctersList />
              // </PublicRoutes>
            }/>
             <Route
            path="/admin/usersList"
            element={
              // <PublicRoutes>
                <UserList />
              // </PublicRoutes>
            }/>
              <Route
            path="/docter/profile/:userId"
            element={
              // <PublicRoutes>
                <Profile />
              //  </PublicRoutes>
            }/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
