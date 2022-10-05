import React from "react";
import { Form, Button, Input, Col, Row } from "antd";
import Layout from "./Layout";
import { Space, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";

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
        { ...values, userId: user._id },
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
        <Form onFinish={onFinish}>
          <h4 className="card-title">Personal Information</h4>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Website"
                name="website"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Website" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>

          <hr />

          <h4 className="card-title">Professional Information</h4>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Specialization"
                name="specialization"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Specialization" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Experience"
                name="experience"
                type="number"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Experience" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Fee/Visit"
                name="feePerConsultation"
                type="number"
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Fee/Visit" />
              </Form.Item>
            </Col>
            {/* <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Timings"
                name="timings"
                rules={[{ required: true }]}
              >
                <Space direction="vertical">
                  <TimePicker.RangePicker status="error" />
                </Space>
              </Form.Item>
            </Col> */}
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="d-flex justify-content-end">
                <Button className="primary-button" htmlType="submit">
                  SUBMIT
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Layout>
    </>
  );
};

export default ApplyDocter;
