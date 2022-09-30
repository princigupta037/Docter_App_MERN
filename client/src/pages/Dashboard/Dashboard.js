import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import { setUser } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";

const Dashboard = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        console.log(response.data.data);
      } else {
        localStorage.clear();
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      Navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  return (
    <Layout>
      <h1> Dashboard</h1>
    </Layout>
  );
};

export default Dashboard;
