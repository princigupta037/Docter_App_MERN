import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
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
        setMessage(response.data.message);
        localStorage.setItem("token", response.data.data);
      } else {
      console.log( "error",response.data.message);

        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
