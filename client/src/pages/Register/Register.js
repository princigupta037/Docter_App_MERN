import React, { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [messgae, setMessage] = useState("");
  // const [email, setEmail] =useState('');
  // const [password, setPassword] =useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        values
      );

      if (response.data.success) {
        setMessage(response.data.message);
        // toast.success(response.data.message);
        // toast("Redirected to login page");
        // navigate("/login");
      } else {
      setMessage(response.data.message);

        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {});

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Button htmlType="submit">Register</Button>
        {messgae && <p>{messgae}</p>}
        <Link to="/login"> Click here to login</Link>
      </Form>
    </>
  );
};

export default Register;
