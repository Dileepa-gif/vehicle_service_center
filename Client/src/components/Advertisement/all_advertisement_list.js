import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";

export default function AdvertisementList(props) {
  const [user, setUser] = useState("");
  const [advertisements, setAdvertisements] = useState([]);
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
        .get("/advertisement/getAllAdvertisements", {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAdvertisements(res.data.data);
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

  const deleteAdvertisement = (id) => {
    axios
      .delete(`advertisement/delete/${id}`, {
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
        window.location = "/all_advertisement_list";
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
              <h2>All Advertisements</h2>
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
                      <th>Advertisement Id</th>
                      <th>Vehicle Id</th>
                      <th>Thumbnail</th>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Manufactured Year</th>
                      <th>Mileage</th>
                      <th>Price</th>
                      <th>City</th>
                      <th>Is Sold</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertisements.map((advertisement, i) => {
                      return (
                        <tr>
                          <td>{advertisement.id}</td>
                          <td>
                            <img
                              src={advertisement.thumbnail}
                              className="small_img"
                            />
                          </td>
                          <td>{advertisement.brand}</td>
                          <td>{advertisement.brand}</td>
                          <td>{advertisement.model}</td>
                          <td>{advertisement.manufactured_year}</td>
                          <td>{advertisement.mileage}</td>
                          <td>{advertisement.price}</td>
                          <td>{advertisement.city}</td>
                          <td>
                            {advertisement.is_sold === 1 && <span>Yes</span>}
                            {advertisement.is_sold === 0 && <span>No</span>}
                          </td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <a href={`/Advertisement/${advertisement.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                >
                                  Show
                                </button>
                              </a>
                              <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() =>
                                    deleteAdvertisement(advertisement.id)
                                  }
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
