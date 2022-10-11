import Layout from "../Layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DocterForm from "../../components/DocterForm";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import moment from "moment";

const Profile = () => {
  const dispatch = useDispatch();
  const [docter, setDocter] = useState(null);
  const params = useParams();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      console.log("val---->", values, user);
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/docter/update-docter-data",
        {
          ...values,
          userId: user?._id,
        //   timings: [
        //     moment(values.timings[0]).format("HH:mm"),
        //     moment(values.timings[1]).format("HH:mm"),
        //   ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDocter(response.data.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getdocterData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/docter/get-docter-data",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setDocter(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdocterData();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="page-title">Profile </h1>
        <hr />
        {docter && <DocterForm onFinish={onFinish} initialValues={docter} />}
      </Layout>
    </div>
  );
};

export default Profile;
