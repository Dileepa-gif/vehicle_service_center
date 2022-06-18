import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditSystemStatus(props) {
  const [user, setUser] = useState("");
  const [system_statusData, setSystemStatusData] = useState({
    is_active: "",
  });

  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
      axios
        .get(`/system_status/getSystemStatus`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setSystemStatusData({
              is_active: res.data.data[0].is_active,
            });
          } else {
            setMessage({
              status: true,
              success: false,
              message: res.data.message,
            });
          }
        })
        .catch((error) => {
          console.log("error = " + error);
          window.location = "/";
        });
    } else {
      window.location = "/";
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`system_status/update`, system_statusData, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setMessage({
            status: true,
            success: true,
            message: res.data.message,
          });
        } else {
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      });
  };

  return (
    <div className="wrapper">
      <Sidebar />

      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col">
              <Navbar />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h2>System Status Profile</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {message.status && message.success ? (
                <div className="alert alert-success" role="alert">
                  {message.message}
                </div>
              ) : null}

              {message.status && !message.success ? (
                <div className="alert alert-danger" role="alert">
                  {message.message}
                </div>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <form action="" method="post" onSubmit={onSubmit}>

                <div className="form-group">
                  <label for="is_active">Activation Of System</label>

                  <select
                    className="form-control"
                    id="is_active"
                    name="is_active"
                    placeholder="Select Status"
                    value={system_statusData.is_active}
                    onChange={(e) =>
                      setSystemStatusData({
                        ...system_statusData,
                        is_active: e.target.value,
                      })
                    }
                  >
                    <option value="1">Activate</option>
                    <option value="0">Deactivate</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
