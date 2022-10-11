import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointmentsList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-appointments-by-userId",
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
      title: "Docter",
      dataIndex: "name",
      render(text, record) {
        return (
          <>
            {record.docterInfo.firstName} {record.docterInfo.lastName}
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
  
  useEffect(() => {
    getAppointmentsList();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="page-header">Appointments </h1>
        <Table columns={column} dataSource={appointments} />
      </Layout>
    </div>
  );
};

export default Appointments;
