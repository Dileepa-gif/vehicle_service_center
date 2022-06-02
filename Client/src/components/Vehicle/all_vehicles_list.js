import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function VehicleList(props) {
  const [user, setUser] = useState("");
  const [vehicles, setVehicles] = useState([]);
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
        .get("/vehicle/getAllVehicles", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setVehicles(res.data.data);
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

  // const deleteVehicle = (id) => {
  //   axios
  //     .delete(`vehicle/delete/${id}`, {
  //       headers: {
  //         Authorization: user.token,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success) {
  //         window.location.reload(false);
  //       } else {
  //         setMessage({
  //           status: true,
  //           success: false,
  //           message: res.data.message,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error = " + error);
  //       window.location = "/all_vehicle_list";
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
              <h2>All Vehicles</h2>
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
                      <th>Vehicle Id</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Type</th>
                      <th>Customer Id</th>
                      <th>Customer Name</th>
                      <th>Contact Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle, i) => {
                      return (
                        <tr>
                          <td>{vehicle.id}</td>
                          <td>{vehicle.vehicle_number}</td>
                          <td>{vehicle.vehicle_type}</td>
                          <td>{vehicle.customer_id}</td>
                          <td>
                            {vehicle.first_name}{"  "}
                            {vehicle.last_name}
                          </td>
                          <td>{vehicle.contact_number}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <a
                                href={`/service_history_by_vehicle/${vehicle.id}`}
                              >
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
