import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import { setUser } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { Col, Row } from "antd";
import Docter from "../../components/Docter";

const Dashboard = (props) => {
  const [docter, setDocter] = useState([]);
  
  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-all-approved-docters",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setDocter([response.data.data]);
      }
    } catch (error) {
      console.log(error);
      // localStorage.clear();
      // Navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {docter && docter.map((docter) => (
          <Col   span={8} xs={24} sm={24} lg={8}>
            <Docter docter={docter} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Dashboard;
