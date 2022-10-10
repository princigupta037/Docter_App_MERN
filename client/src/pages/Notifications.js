import Layout from "./Layout";
import React from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const markAllAsSeen = async () => {
    console.log("insidemarkAllAsSeen");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/mark-all-notifications-as-seen",
        {
          userId: user._id,
        }
      );
      if (response.data.success) {
        toast.success("All notifications marked as seen");
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteALL = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/delete-all-notifications",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Layout>
        <h1 className="page-title"> Notifications </h1>
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={0}>
            <div className="d-flex justify-content-end">
              <div className="anchor">
                <Link onClick={markAllAsSeen}> Mark all as seen</Link>
              </div>
            </div>
            {user?.unseenNotifications.map((notification) => (
              <div
                className="card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="seen" key={1}>
            <div className="d-flex justify-content-end">
              <div className="anchor">
                <Link onClick={deleteALL}>Delete all </Link>
              </div>
            </div>
            {user?.seenNotifications.map((notification) => (
              <div
                className="card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </div>
  );
};

export default Notifications;
