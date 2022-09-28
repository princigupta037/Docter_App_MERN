import React,{useEffect} from "react";
// import Login from "./Login/Login";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const getData = async () =>{
    try {
      const response = await axios.post("http://localhost:5000/api/user/get-user-info-by-id",{},{
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
      <div> </div>
      Home Page
      <Link to="/login"> Click here to login</Link>
    </div>
  );
};

export default Home;
