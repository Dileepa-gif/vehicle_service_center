import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function AppointmentList(props) {
  const [user, setUser] = useState("");
  const [appointments, setAppointments] = useState([]);
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
        .get("/appointment/getAllAppointments", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAppointments(res.data.data);
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

  const deleteAppointment = (id) => {
    axios
      .delete(`appointment/delete/${id}`, {
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
        window.location = "/all_appointment_list";
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
              <h2>List of all appointments</h2>
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
                      <th>Appointment Id</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Type</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Upgrade Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, i) => {
                      return (
                        <tr>
                          <td>{appointment.id}</td>
                          <td>{appointment.vehicle_number}</td>
                          <td>{appointment.vehicle_type}</td>
                          <td>{appointment.date}</td>
                          <td>
                            {appointment.start_time}.00 - {appointment.end_time}
                            .00
                          </td>
                          <td>{appointment.upgrade_type_name}</td>
                          <td>{appointment.status}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              {user && user.sub.status === "ADMIN" && (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() =>
                                    deleteAppointment(appointment.id)
                                  }
                                >
                                  Delete
                                </button>
                              )}
                              <a href={`/edit_appointment_status/${appointment.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  Show
                                </button>
                              </a>
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
