import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function ServiceList(props) {
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
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
        .get("/service/getAllServices", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setServices(res.data.data);
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



  return (
    <div className="wrapper my-custom-scrollbar my-custom-scrollbar-primary">
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
              <h2>All Services</h2>
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
                      <th>Service Id</th>
                      <th>Appointment Id</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Type</th>
                      <th>Date And Time</th>
                      <th>Upgrade Type</th>
                      <th>Employee Id</th>
                      <th>Is Done</th>
                      <th>Is Paid</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, i) => {
                      return (
                        <tr>
                          <td>{service.id}</td>
                          <td>
                            <a
                              className="table_link"
                              href={`/edit_appointment_status/${service.appointment_id}`}
                            >
                              {service.appointment_id}
                            </a>
                          </td>
                          <td>{service.vehicle_number}</td>
                          <td>{service.vehicle_type}</td>
                          <td>{service.created_at}</td>
                          <td>{service.upgrade_type_name}</td>
                          <td>
                            <a
                              className="table_link"
                              href={`/edit_employee/${service.employee_id}`}
                            >
                              {service.employee_id}
                            </a>
                          </td>
                          <td>
                            {service.is_done === 1 && <span>Yes</span>}
                            {service.is_done === 0 && <span>No</span>}
                          </td>
                          <td>
                            {service.is_paid === 1 && <span>Yes</span>}
                            {service.is_paid === 0 && <span>No</span>}
                          </td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              {service.is_done === 0 && (
                                <a href={`/active_service/${service.id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    Show
                                  </button>
                                </a>
                              )}

                              {service.is_done === 1 && service.is_paid === 0 && (
                                <a href={`/completed_service/${service.id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    Show
                                  </button>
                                </a>
                              )}

                              {service.is_done === 1 && service.is_paid === 1 && (
                                <a href={`/bill/${service.id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    Show
                                  </button>
                                </a>
                              )}
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
