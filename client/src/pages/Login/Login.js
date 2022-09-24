import React from "react";
import { Form, Button, Input } from "antd";
import {Link} from 'react-router-dom'


const Login = () => {
  // const [user, setUser] =useState('');
  // const [email, setEmail] =useState('');
  // const [password, setPassword] =useState('');

  const onFinish = (values) => {
    // e.preventDefault();
    console.log(values,values);
  };

  return (
    <>
        <Form onFinish={onFinish}>
         

            <Form.Item label="Email" name="email">
              <Input  placeholder="Email"  />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button htmlType="submit">
              Login
            </Button>
            <Link to="/register" > Click here to register</Link>

        </Form>

        </>
  );
};

export default Login;
