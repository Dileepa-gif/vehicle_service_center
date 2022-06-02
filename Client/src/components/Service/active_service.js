import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditService(props) {
  const [user, setUser] = useState("");
  const [serviceData, setServiceData] = useState({
    id: "",
    is_done: "",
    is_paid: "",
    payment_method: "",
    discount: "",
    rating: "",
    appointment_id: "",
    employee_id: "",
    created_at: "",
    status: "",
    date: "",
    vehicle_id: "",
    customer_id: "",
    time_slot_id: "",
    upgrade_type_id: "",
    customer_first_name: "",
    customer_last_name: "",
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
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    employee_nic_number: "",
    employee_phone_number: "",
    employee_address: "",
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
        .get(`/service/getServiceById/${id}`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setServiceData({
              id: res.data.data[0].id,
              is_done: res.data.data[0].is_done,
              is_paid: res.data.data[0].is_paid,
              payment_method: res.data.data[0].payment_method,
              discount: res.data.data[0].discount,
              rating: res.data.data[0].rating,
              appointment_id: res.data.data[0].appointment_id,
              employee_id: res.data.data[0].employee_id,
              created_at: res.data.data[0].created_at,
              status: res.data.data[0].status,
              date: res.data.data[0].date,
              vehicle_id: res.data.data[0].vehicle_id,
              customer_id: res.data.data[0].customer_id,
              time_slot_id: res.data.data[0].time_slot_id,
              upgrade_type_id: res.data.data[0].upgrade_type_id,
              customer_first_name: res.data.data[0].customer_first_name,
              customer_last_name: res.data.data[0].customer_last_name,
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
              employee_first_name: res.data.data[0].employee_first_name,
              employee_last_name: res.data.data[0].employee_last_name,
              employee_email: res.data.data[0].employee_email,
              employee_nic_number: res.data.data[0].employee_nic_number,
              employee_phone_number: res.data.data[0].employee_phone_number,
              employee_address: res.data.data[0].employee_address,
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
      .put(`service/done/${id}`, serviceData, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          window.location = `/completed_service/${props.match.params.id}`;
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
              <h2>Service Profile</h2>
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
                    <td>Service Id</td>
                    <td>:-</td>
                    <td>{serviceData.id}</td>
                  </tr>

                  <tr>
                    <td>Appointment Id</td>
                    <td>:-</td>
                    <td>
                      <a
                        className="table_link"
                        href={`/edit_appointment_status/${serviceData.appointment_id}`}
                      >
                        {serviceData.appointment_id}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>Is Done</td>
                    <td>:-</td>
                    <td>{serviceData.is_done === 1 && <span>Yes</span>}{serviceData.is_done === 0 && <span>No</span>}</td>
                  </tr>


                  <tr>
                    <td>Vehicle Id</td>
                    <td>:-</td>
                    <td>{serviceData.vehicle_id}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Number</td>
                    <td>:-</td>
                    <td>{serviceData.vehicle_number}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Type</td>
                    <td>:-</td>
                    <td>{serviceData.vehicle_type}</td>
                  </tr>

                  <tr>
                    <td>Upgrade Type</td>
                    <td>:-</td>
                    <td>{serviceData.upgrade_type_name}</td>
                  </tr>

                  <tr>
                    <td>Description</td>
                    <td>:-</td>
                    <td>{serviceData.description}</td>
                  </tr>

                  <tr>
                    <td>Date And Time</td>
                    <td>:-</td>
                    <td>{serviceData.created_at}</td>
                  </tr>

                  <tr>
                    <td>Price</td>
                    <td>:-</td>
                    <td>{serviceData.price}.00</td>
                  </tr>

                  <tr>
                    <td>Custom Id</td>
                    <td>:-</td>
                    <td>{serviceData.customer_id}</td>
                  </tr>

                  <tr>
                    <td>Custom Name</td>
                    <td>:-</td>
                    <td>
                      {serviceData.customer_first_name} {serviceData.customer_last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>Customer's Contact Number</td>
                    <td>:-</td>
                    <td>{serviceData.contact_number}</td>
                  </tr>

                  <tr>
                    <td>Customer's Nic Number</td>
                    <td>:-</td>
                    <td>{serviceData.nic_number}</td>
                  </tr>

                  <tr>
                    <td>Customer's Email</td>
                    <td>:-</td>
                    <td>{serviceData.email}</td>
                  </tr>

                  <tr>
                    <td>Employee Id</td>
                    <td>:-</td>
                    <td>
                      <a
                        className="table_link"
                        href={`/edit_employee/${serviceData.employee_id}`}
                      >
                        {serviceData.employee_id}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>Employee Name</td>
                    <td>:-</td>
                    <td>
                      {serviceData.employee_first_name}{" "}
                      {serviceData.employee_last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>Employee's Contact Number</td>
                    <td>:-</td>
                    <td>{serviceData.employee_phone_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {user && user.sub.status === "EMPLOYEE" && (
            <div className="row">
              <div className="col">
                <form action="" method="post" onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>

                    <select
                      className="form-control"
                      id="discount"
                      name="discount"
                      placeholder="Select Status"
                      value={serviceData.discount}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          discount: e.target.value,
                        })
                      }
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary mr-2">
                    Service Done
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
