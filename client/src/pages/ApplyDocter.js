import React from "react";
import { Form, Button, Input, Col, Row } from "antd";
import Layout from "./Layout";
import { Space, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";
import DocterForm from "../components/DocterForm";
import moment from "moment";

const ApplyDocter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log("val---->", values, user);
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/apply-docter-account",
        { ...values, userId: user._id ,
          // timings: [
          //   moment(values.timings[0]).format("HH:mm"),
          //   moment(values.timings[1]).format("HH:mm"),
          // ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error, "error");
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <h1 className="page-title"> Apply Docter</h1>
       <DocterForm  onFinish={onFinish}/>
      </Layout>
    </>
  );
};

export default ApplyDocter;
