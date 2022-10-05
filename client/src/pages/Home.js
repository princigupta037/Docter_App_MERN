import React,{useEffect} from "react";
// import Login from "./Login/Login";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";

const Home = () => {

  const getData = async () =>{
    try {
      const response = await axios.post("http://localhost:5000/api/user/get-user-info-by-id",{
        
      },{
        headers:{
          Authorization:"Bearer" + localStorage.getItem("token")
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    getData();
  },[]);


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
