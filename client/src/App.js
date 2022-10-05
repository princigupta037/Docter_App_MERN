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
        </Routes>
      </Router>
    </>
  );
};

export default App;
