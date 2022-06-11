import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditService(props) {
  const [user, setUser] = useState("");
  const [serviceData, setServiceData] = useState({
    id:"",
    is_done: "",
    is_paid: "",
    payment_method: "",
    discount: 0,
    rating: 0,
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
    price: 0,
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

  const [paymentData, setPaymentData] = useState({
    price: 0,
    payment_method: "Cash",
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

            setPaymentData({
              ...paymentData,
              price:
                res.data.data[0].price -
                (res.data.data[0].price * res.data.data[0].discount) / 100,
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
              <h2>Service Bill</h2>
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

          <br />
          <div className="row">
            <div className="col-8">
              <h6>
                <u>Vehicle Details</u>
              </h6>
              <table className="table">
                <tbody>

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

                </tbody>
              </table>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-8">
              <h6>
                <u>Service Details</u>
              </h6>
              <table className="table">
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
                </tbody>
              </table>
            </div>
          </div>


          <br />
          <div className="row">
            <div className="col-8">
              <h6>
                <u>Customer Details</u>
              </h6>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Custom Id</td>
                    <td>:-</td>
                    <td>{serviceData.customer_id}</td>
                  </tr>

                  <tr>
                    <td>Custom Name</td>
                    <td>:-</td>
                    <td>
                      {serviceData.customer_first_name}{" "}
                      {serviceData.customer_last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>Contact Number</td>
                    <td>:-</td>
                    <td>{serviceData.contact_number}</td>
                  </tr>

                  <tr>
                    <td>Nic Number</td>
                    <td>:-</td>
                    <td>{serviceData.nic_number}</td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>:-</td>
                    <td>{serviceData.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-8">
              <h6>
                <u>Employee Details</u>
              </h6>
              <table className="table">
                <tbody>
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
                    <td>Contact Number</td>
                    <td>:-</td>
                    <td>{serviceData.employee_phone_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-8">
              <h6>
                <u>Payment Details</u>
              </h6>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Price</td>
                    <td>:-</td>
                    <td>{(serviceData.price).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>:-</td>
                    <td>{serviceData.discount}%</td>
                  </tr>
                  <tr>
                    <td>Amount Of Payment</td>
                    <td>:-</td>
                    <td>
                      <u>
                        {(serviceData.price - (serviceData.price * serviceData.discount) / 100).toFixed(2)}
                      </u>
                    </td>
                  </tr>

                  <tr>
                    <td>Payment Method</td>
                    <td>:-</td>
                    <td>{serviceData.payment_method}</td>
                  </tr>

                  <tr>
                    <td>Rating</td>
                    <td>:-</td>
                    <td>{serviceData.rating}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
