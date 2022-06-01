import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditAppointment(props) {
  const [user, setUser] = useState("");
  const [appointmentData, setAppointmentData] = useState({
    status: "",
    date: "",
    created_at: "",
    vehicle_id: "",
    customer_id: "",
    time_slot_id: "",
    upgrade_type_id: "",
    user_first_name: "",
    user_last_name: "",
    email: "",
    contact_number: "",
    nic_number: "",
    is_completed: "",
    upgrade_type_name: "",
    description: "",
    price: "",
    start_time: "",
    end_time: "",
    vehicle_type: "",
    vehicle_number: "",
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
        .get(`/appointment/getAppointmentById/${id}`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAppointmentData({
              status: res.data.data[0].status,
              date: res.data.data[0].date,
              created_at: res.data.data[0].created_at,
              vehicle_id: res.data.data[0].vehicle_id,
              customer_id: res.data.data[0].customer_id,
              time_slot_id: res.data.data[0].time_slot_id,
              upgrade_type_id: res.data.data[0].upgrade_type_id,
              user_first_name: res.data.data[0].user_first_name,
              user_last_name: res.data.data[0].user_last_name,
              email: res.data.data[0].email,
              contact_number: res.data.data[0].contact_number,
              nic_number: res.data.data[0].nic_number,
              is_completed: res.data.data[0].is_completed,
              upgrade_type_name: res.data.data[0].upgrade_type_name,
              description: res.data.data[0].description,
              price: res.data.data[0].price,
              start_time: res.data.data[0].start_time,
              end_time: res.data.data[0].end_time,
              vehicle_type: res.data.data[0].vehicle_type,
              vehicle_number: res.data.data[0].vehicle_number,
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

  const changeStatus = (id) => {
    axios
      .get(`appointment/changeStatus/${id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        console.log(res);
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
        window.location = "/not_arrived_appointment_list";
      });
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const id = props.match.params.id;
  //   axios
  //     .put(`appointment/update/${id}`, appointmentData, {
  //       headers: {
  //         Authorization: user.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success) {
  //         setMessage({
  //           status: true,
  //           success: true,
  //           message: res.data.message,
  //         });
  //       } else {
  //         setMessage({
  //           status: true,
  //           success: false,
  //           message: res.data.message,
  //         });
  //       }
  //     });
  // };

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
              <h2>Appointment Profile</h2>
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
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Appointment Id</td>
                    <td>:-</td>
                    <td>{props.match.params.id}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Id</td>
                    <td>:-</td>
                    <td>{appointmentData.vehicle_id}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Number</td>
                    <td>:-</td>
                    <td>{appointmentData.vehicle_number}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Type</td>
                    <td>:-</td>
                    <td>{appointmentData.vehicle_type}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>:-</td>
                    <td>{appointmentData.status}</td>
                  </tr>

                  <tr>
                    <td>Upgrade Type</td>
                    <td>:-</td>
                    <td>{appointmentData.upgrade_type_name}</td>
                  </tr>

                  <tr>
                    <td>Description</td>
                    <td>:-</td>
                    <td>{appointmentData.description}</td>
                  </tr>

                  <tr>
                    <td>Date</td>
                    <td>:-</td>
                    <td>{appointmentData.date}</td>
                  </tr>

                  <tr>
                    <td>Time Slot</td>
                    <td>:-</td>
                    <td>
                      {appointmentData.start_time}.00 -{" "}
                      {appointmentData.end_time}.00
                    </td>
                  </tr>

                  <tr>
                    <td>Price</td>
                    <td>:-</td>
                    <td>{appointmentData.price}</td>
                  </tr>

                  <tr>
                    <td>Custom Id</td>
                    <td>:-</td>
                    <td>{appointmentData.customer_id}</td>
                  </tr>

                  <tr>
                    <td>Custom Name</td>
                    <td>:-</td>
                    <td>
                      {appointmentData.user_first_name}{" "}
                      {appointmentData.user_last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>Contact Number</td>
                    <td>:-</td>
                    <td>{appointmentData.contact_number}</td>
                  </tr>

                  <tr>
                    <td>Nic Number</td>
                    <td>:-</td>
                    <td>{appointmentData.nic_number}</td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>:-</td>
                    <td>{appointmentData.email}</td>
                  </tr>
                </tbody>
              </table>
              {user && user.sub.status === "EMPLOYEE" && appointmentData.status === "Reserved" && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => changeStatus(props.match.params.id)}
              >
                Change Status
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
