import React ,{ useState ,useEffect}from "react";
import { Form, Button, Input } from "antd";
import {Link} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';



const Register = () => {

  // const [user, setUser] =useState('');
  // const [email, setEmail] =useState('');
  // const [password, setPassword] =useState('');

  const onFinish = async (values) => {
    try {
        console.log('17')

        const response = await axios.post('http://localhost:5000/api/user/register',values);
        console.log('19')

        if(response.data.success){
            toast.success(response.data.message);        
        }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error,'error')
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {


  });

  return (
    <>
        <Form onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input  placeholder="Email"  />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button htmlType="submit">
              Register
            </Button>

            <Link to="/login" > Click here to login</Link>
        </Form>
        </>
  );
};

export default Register;
