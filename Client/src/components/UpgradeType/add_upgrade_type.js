import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function UpgradeTypeList(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
    } else {
      window.location = "/";
    }
  }, []);

  const [upgrade_typeData, setUpgradeTypeData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/upgrade_type/create`, upgrade_typeData, {
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
          setUpgradeTypeData({
            name: "",
            description: "",
            price: "",
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
              <h2>New UpgradeType</h2>
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
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={upgrade_typeData.name}
                    onChange={(e) =>
                      setUpgradeTypeData({
                        ...upgrade_typeData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    id="description"
                    value={upgrade_typeData.description}
                    onChange={(e) =>
                      setUpgradeTypeData({
                        ...upgrade_typeData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    id="price"
                    value={upgrade_typeData.price}
                    onChange={(e) =>
                      setUpgradeTypeData({
                        ...upgrade_typeData,
                        price: e.target.value,
                      })
                    }
                    placeholder="Price"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
