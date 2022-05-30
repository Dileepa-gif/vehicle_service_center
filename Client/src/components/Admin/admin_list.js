import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function AdminList(props) {
  const [user, setUser] = useState("");
  const [admins, setAdmins] = useState([]);
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
        .get("/admin/getAllAdmins", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAdmins(res.data.data);
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

  const deleteAdmin = (id) => {
    axios
      .delete(`admin/delete/${id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          window.location.reload(false);
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
        window.location = "/admin_list";
      });
  };

  return (
    <div className="wrapper my-custom-scrollbar my-custom-scrollbar-primary">
      <Sidebar />

      <div id="content">
      <div class="container">
      <div className="row">
          <div className="col">
            <Navbar />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>List of all admins</h2>
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
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Admin Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>NIC</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, i) => {
                    return (
                      <tr>
                        <td>{admin.id}</td>
                        <td>{admin.first_name}</td>
                        <td>{admin.last_name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.nic_number}</td>
                        <td>{admin.phone_number}</td>
                        <td>{admin.address}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => deleteAdmin(admin.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
