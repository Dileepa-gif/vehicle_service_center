import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function EmployeeList(props) {
  const [user, setUser] = useState("");
  const [employees, setEmployees] = useState([]);
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
        .get("/employee/getAllEmployees", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setEmployees(res.data.data);
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

  const deleteEmployee = (id) => {
    axios
      .delete(`employee/delete/${id}`, {
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
        window.location = "/employee_list";
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
            <h2>List of all employees</h2>
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
                    <th>Employee Id</th>
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
                  {employees.map((employee, i) => {
                    return (
                      <tr>
                        <td>{employee.id}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.nic_number}</td>
                        <td>{employee.phone_number}</td>
                        <td>{employee.address}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => deleteEmployee(employee.id)}
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
