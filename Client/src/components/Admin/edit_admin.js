import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditAdmin(props) {
  const [user, setUser] = useState("");
  const [adminData, setAdminData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    nic_number: "",
    phone_number: "",
    address: "",
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
      const id = props.match.params.id;
      axios
        .get(`/admin/getAdminById/${id}`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAdminData({
              id: res.data.data[0].id,
              first_name: res.data.data[0].first_name,
              last_name: res.data.data[0].last_name,
              email: res.data.data[0].email,
              nic_number: res.data.data[0].nic_number,
              phone_number: res.data.data[0].phone_number,
              address: res.data.data[0].address,
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
    const id = props.match.params.id;
    axios
      .put(`admin/update/${id}`, adminData, {
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
              <h2>Admin Profile</h2>
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
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        id="first_name"
                        value={adminData.first_name}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            first_name: e.target.value,
                          })
                        }
                        placeholder="First name"
                        required
                        minLength="2"
                        maxLength="250"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        id="last_name"
                        value={adminData.last_name}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            last_name: e.target.value,
                          })
                        }
                        placeholder="Last name"
                        required
                        minLength="2"
                        maxLength="250"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                    required
                    maxLength="250"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="email"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Password"
                    minLength="8"
                    maxLength="25"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nic_number">NIC</label>
                  <input
                    type="text"
                    name="nic_number"
                    className="form-control"
                    id="nic_number"
                    value={adminData.nic_number}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        nic_number: e.target.value,
                      })
                    }
                    placeholder="NIC"
                    required
                    minLength="10"
                    maxLength="12"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    id="phone_number"
                    value={adminData.phone_number}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        phone_number: e.target.value,
                      })
                    }
                    placeholder="Phone Number"
                    required
                    minLength="10"
                    maxLength="12"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                    value={adminData.address}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        address: e.target.value,
                      })
                    }
                    placeholder="Address"
                    required
                    minLength="2"
                    maxLength="250"
                  />
                </div>
                {user && user.sub.id === adminData.id && (
                  <button type="submit" className="btn btn-primary mr-2">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
