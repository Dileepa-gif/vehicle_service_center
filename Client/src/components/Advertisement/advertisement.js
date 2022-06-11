import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditAdvertisement(props) {
  const [user, setUser] = useState("");
  const [advertisementData, setAdvertisementData] = useState({
    id: "",
    vehicle_id: "",
    brand: "",
    model: "",
    thumbnail: "",
    manufactured_year: "",
    vehicle_condition: "",
    transmission: "",
    fuel_type: "",
    engine_capacity: "",
    mileage: "",
    seller_name: "",
    city: "",
    price: 0,
    contact_number: "",
    is_sold: "",
    created_at: "",
    images: "",
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
        .get(`/advertisement/getAdvertisementById/${id}`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAdvertisementData({
              id: res.data.data[0].id,
              vehicle_id: res.data.data[0].vehicle_id,
              brand: res.data.data[0].brand,
              model: res.data.data[0].model,
              thumbnail: res.data.data[0].thumbnail,
              manufactured_year: res.data.data[0].manufactured_year,
              vehicle_condition: res.data.data[0].vehicle_condition,
              transmission: res.data.data[0].transmission,
              fuel_type: res.data.data[0].fuel_type,
              engine_capacity: res.data.data[0].engine_capacity,
              mileage: res.data.data[0].mileage,
              seller_name: res.data.data[0].seller_name,
              city: res.data.data[0].city,
              price: res.data.data[0].price,
              contact_number: res.data.data[0].contact_number,
              is_sold: res.data.data[0].is_sold,
              created_at: res.data.data[0].created_at,
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
          // window.location = "/";
        });
    } else {
      // window.location = "/";
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
          window.location = "/all_advertisement_list";
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
              <h2>Advertisement Profile</h2>
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
              <img src={advertisementData.thumbnail} className="large_img" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Advertisement Id</td>
                    <td>:-</td>
                    <td>{advertisementData.id}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Id</td>
                    <td>:-</td>
                    <td>{advertisementData.vehicle_id}</td>
                  </tr>

                  <tr>
                    <td>Brand</td>
                    <td>:-</td>
                    <td>{advertisementData.brand}</td>
                  </tr>

                  <tr>
                    <td>Model</td>
                    <td>:-</td>
                    <td>{advertisementData.model}</td>
                  </tr>

                  <tr>
                    <td>Manufactured Year</td>
                    <td>:-</td>
                    <td>{advertisementData.manufactured_year}</td>
                  </tr>

                  <tr>
                    <td>Vehicle Condition</td>
                    <td>:-</td>
                    <td>{advertisementData.vehicle_condition}</td>
                  </tr>

                  <tr>
                    <td>Transmission</td>
                    <td>:-</td>
                    <td>{advertisementData.transmission}</td>
                  </tr>

                  <tr>
                    <td>Fuel Type</td>
                    <td>:-</td>
                    <td>{advertisementData.fuel_type}</td>
                  </tr>

                  <tr>
                    <td>Engine Capacity</td>
                    <td>:-</td>
                    <td>{advertisementData.engine_capacity}</td>
                  </tr>

                  <tr>
                    <td>Mileage</td>
                    <td>:-</td>
                    <td>{advertisementData.mileage}</td>
                  </tr>

                  <tr>
                    <td>Seller Name</td>
                    <td>:-</td>
                    <td>{advertisementData.seller_name}</td>
                  </tr>

                  <tr>
                    <td>City</td>
                    <td>:-</td>
                    <td>{advertisementData.city}</td>
                  </tr>

                  <tr>
                    <td>Price</td>
                    <td>:-</td>
                    <td>{(advertisementData.price).toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td>Contact Number</td>
                    <td>:-</td>
                    <td>{advertisementData.contact_number}</td>
                  </tr>

                  <tr>
                    <td>Created At</td>
                    <td>:-</td>
                    <td>{advertisementData.created_at}</td>
                  </tr>

                  <tr>
                    <td>Is Sold</td>
                    <td>:-</td>
                    <td>
                      {advertisementData.is_sold === 1 && <span>Yes</span>}
                      {advertisementData.is_sold === 0 && <span>No</span>}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => deleteAdvertisement(advertisementData.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
