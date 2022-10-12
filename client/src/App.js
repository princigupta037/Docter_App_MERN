import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplyDocter from "./pages/ApplyDocter";
import Notifications from "./pages/Notifications";
import DoctersList from "./pages/Admin/DoctersList";
import UserList from "./pages/Admin/UserList";
import Profile from "./pages/Docter/Profile";
import BookAppointment from "./pages/Docter/BookAppointment";
import Appointments from "./pages/Appointments";
import DocterAppointments from "./pages/Docter/DocterAppointment";
import My404Component from "./pages/My404Component";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" exact={true} element={<My404Component />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/book-appointment/:docterId"
            element={<BookAppointment />}
          />
          <Route path="/user/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply-docter" element={<ApplyDocter />} />
          <Route path="/login/notifications" element={<Notifications />} />
          <Route path="/admin/doctersList" element={<DoctersList />} />
          <Route path="/admin/usersList" element={<UserList />} />
          <Route path="/docter/profile/:userId" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/docter/appointments" element={<DocterAppointments />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
