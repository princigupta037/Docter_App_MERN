import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import "./login.css";

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
        // <Form onFinish={onFinish}>
        //   <Form.Item label="Email" name="email">
        //     <Input placeholder="Email" />
        //   </Form.Item>
        //   <Form.Item label="Password" name="password">
        //     <Input type="password" placeholder="Password" />
        //   </Form.Item>

        //   <Button htmlType="submit">Login</Button>
        //   {messgae && <p>{messgae}</p>}

        //   <Link to="/register"> Click here to register</Link>
        // </Form>

        <div id="login">
          <h3 className="text-center text-white pt-5">Login form</h3>
          <div className="container">
            <div
              id="login-row"
              className="row justify-content-center align-items-center"
            >
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <Form id="login-form" className="form" onFinish={onFinish}>
                    <h3 className="text-center text-info">Login</h3>
                    <div className="form-group">
                      <br />
                      <Form.Item label="Email" name="email">
                        <Input
                          type="email"
                          placeholder="email"
                          name="email"
                          label="email"
                          id="username"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <br />
                      <Form.Item label="Password" name="password">
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          label="password"
                          id="password"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <Input
                        type="submit"
                        name="submit"
                        className="pt-2 btn btn-info btn-md"
                        value="submit"
                      />
                       <a href="/register" className="text-info mt-4 btn-md">
                        Register here
                      </a>
                    </div>
                     
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Login;
