import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

const DocterAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointmentsList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/docter/get-appointments-by-docterId",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.success) {
        setAppointments([response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const column = [
    {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render(text, record) {
        return (
          <>
            {record.userInfo.name} 
          </>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render(text, record) {
        return <>{record.docterInfo.phoneNumber}</>;
      },
    },
    {
      title: "Date & Time",
      dataIndex: "creadtedAt",
      render(text, record) {
        return (
          <>
            {moment(record.date).format("DD-MM-YYYY")} {record.time}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
console.log(appointments, "appointments");
  useEffect(() => {
    getAppointmentsList();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="page-header">DocterAppointments </h1>
        <Table columns={column} dataSource={appointments} />
      </Layout>
    </div>
  );
};

export default DocterAppointments;
