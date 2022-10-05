import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  // const { loading } = useSelector((state) => state.alerts);
  // console.log(loading)
  const [messgae, setMessage] = useState("");
  // const [user, setUser] =useState('');
  // const [email, setEmail] =useState('');
  // const [password, setPassword] =useState('');

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        values
      );

      if (response.data.success) {
        <Navigate to="/dashboard" />;
        setMessage(response.data.message);
        localStorage.setItem("token", response.data.data);
      } else {
        console.log("error", response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      {!messgae ? (
        <Form onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button htmlType="submit">Login</Button>
          {messgae && <p>{messgae}</p>}

          <Link to="/register"> Click here to register</Link>
        </Form>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Login;
