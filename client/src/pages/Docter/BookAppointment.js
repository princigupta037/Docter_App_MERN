import Layout from "../Layout";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const BookAppointment = () => {
  const { user } = useSelector((state) => state.user);
  const [available, setAvailable] = useState(false);
  const params = useParams();
  const [date, setDate] = useState("");
  const [docter, setDocter] = useState([]);
  const [time, setTime] = useState("");

  const getdocterData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/docter/get-docter-info-by-id",
        {
          docterId: params.docterId,
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

  const bookNow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/book-appointment",
        {
          docterId: params.docterId,
          userId: user?._id,
          docterInfo: docter,
          //   userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/check-availability",
        {
          docterId: params.docterId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
       
            setAvailable(true);
          
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
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
        {docter && (
          <h1 className="page-title">
            {docter?.firstName} {docter?.lastName}
          </h1>
        )}
        <Row>
          <Col span={8} sm={24} xs={24} lg={8}>
            <hr />
            <h1 className="normal-text">
              {/* <b> Timings:</b> {docter.timings[0]} - {docter.timings[1]} */}
            </h1>
            <div className="d-flex flex-column pt-2">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(values) => {
                  setAvailable(false);
                  setDate(moment(values[0]).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="mt-3"
                onChange={(values) => {
                  setAvailable(false);
                  setTime(moment(values).format("HH:mm"));
                }}
              />
            </div>
            {available && (
              <Button
                className="primary-button"
                onClick={bookNow}
              >
                Book Now
              </Button>
            )}

            <Button
              className="primary-button"
              onClick={checkAvailability}
            >
              Check Availability
            </Button>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default BookAppointment;
