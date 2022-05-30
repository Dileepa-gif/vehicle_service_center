import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function UpgradeTypeList(props) {
  const [user, setUser] = useState("");
  const [upgrade_types, setUpgradeTypes] = useState([]);
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
        .get("/upgrade_type/getAllUpgradeTypes", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setUpgradeTypes(res.data.data);
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

  const deleteUpgradeType = (id) => {
    axios
      .delete(`upgrade_type/delete/${id}`, {
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
        window.location = "/upgrade_type_list";
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
              <h2>List of all upgrade types</h2>
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
                      <th>Upgrade Type Id</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      {user && user.sub.status === "ADMIN" && (
                      <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {upgrade_types.map((upgrade_type, i) => {
                      return (
                        <tr>
                          <td>{upgrade_type.id}</td>
                          <td>{upgrade_type.name}</td>
                          <td>{upgrade_type.description}</td>
                          <td>{upgrade_type.price}</td>
                          {user && user.sub.status === "ADMIN" && (
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                  deleteUpgradeType(upgrade_type.id)
                                }
                              >
                                Delete
                              </button>
                              <a href={`/edit_upgrade_type/${upgrade_type.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  Edit
                                </button>
                              </a>
                            </div>
                          </td>
                          )}
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
