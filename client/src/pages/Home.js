import React, { useEffect } from "react";
// import Login from "./Login/Login";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getData();
    }
  }, [user]);

  return (
    <div>
      <Layout>
        <h1>Home</h1>
      </Layout>
      <Link to="/login"> Click here to login</Link>
    </div>
  );
};

export default Home;
