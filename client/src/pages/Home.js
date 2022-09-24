import React from 'react';
import Login from "./Login/Login";
import {Link} from 'react-router-dom'


const Home = () => {
    return (
        <div>
            Home Page
            <Link to="/login" > Click here to login</Link>
        </div>
    );
}

export default Home;
