import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DoctersList = () => {
  const [docters, setDocters] = useState([]);

  const getDoctersList = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/get-docters-list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.data.length) {
      setDocters(response.data.data);
    }
  };

  const docterStatusChange  = async (record,status) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/change-docter-status",{
        docterId:record._id,
        status:status,
        userID:record.userID
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.data.length) {
    getDoctersList();
    }
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render(text, record) {
        return (
          <>
            {record.firstName} {record.lastName}
          </>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      dataIndex: "action",
      render(text, record) {
        return (
          <>
            {record.status === "pending" ? <Link onClick={()=>docterStatusChange(record,"approved")}>Approve</Link> : <Link onClick={()=>docterStatusChange(record,"blocked")}>Block</Link>}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getDoctersList();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="page-header">DoctersList </h1>
        <Table columns={column} dataSource={docters} />
      </Layout>
    </div>
  );
};

export default DoctersList;
