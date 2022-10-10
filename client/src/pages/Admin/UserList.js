import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsersList = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/get-users-list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.data.length) {
      setUsers(response.data.data);
    }
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render(text, record) {
        return (
            <Link>Block</Link>
        );
      }
    },
  ];

  useEffect(() => {
    getUsersList();
  },[users]);

  return (
    <div>
      <Layout>
        <h1 className="page-header">UserList </h1>
        <Table columns={column} dataSource={users} />
      </Layout>
    </div>
  );
};

export default UserList;
