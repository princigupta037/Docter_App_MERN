import React from "react";
import { useNavigate } from "react-router-dom";

const Docter = ({ docter }) => {
  const navigate = useNavigate();

  return (
    <div className="card p-2 cursor-pointer" onClick={()=> navigate(`/book-appointment/${docter?._id}`)}>
      <h1>
        {docter.firstName} {docter.lastName}{" "}
      </h1>
      <hr />
      <p>Phone Number:{docter.phoneNumber}</p>
      <p>Address:{docter.address}</p>
      <p>Fee per Visit:{docter.feePerConsultation}</p>
      {/* <p className='card-text'>Timings:{docter?.timings} */}
      {/* </p> */}
    </div>
  );
};

export default Docter;
