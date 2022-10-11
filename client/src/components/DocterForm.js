import { Button, Form, Col, Input, Row, TimePicker, Space } from "antd";
import React from "react";
import Layout from "../pages/Layout";
import moment from "moment";

const DocterForm = ({ onFinish, initialValues }) => {
  return (
    <div>
      <Form
        onFinish={onFinish}
        initialValues={{
          ...initialValues,
          // ...(initialValues && {
          //   timings: [
          //     moment(initialValues?.timings[0], "HH:mm"),
          //     moment(initialValues?.timings[1], "HH:mm"),
          //   ],
          // }),
        }}
      >
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
              // rules={[{ required: true }]}
            >
              <Space direction="vertical">
                <TimePicker.RangePicker format="HH:mm" />
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
    </div>
  );
};

export default DocterForm;
