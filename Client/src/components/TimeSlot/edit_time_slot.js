import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import "../../App.css";

export default function EditTimeSlot(props) {
  const [user, setUser] = useState("");
  const [time_slotData, setTimeSlotData] = useState({
    start: "",
    end: "",
    number_of_vehicles: "",
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
        .get(`/time_slot/getTimeSlotById/${id}`, {
          headers: {
            Authorization: tokenObject.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setTimeSlotData({
              start: res.data.data[0].start,
              end: res.data.data[0].end,
              number_of_vehicles: res.data.data[0].number_of_vehicles,
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
      .put(`time_slot/update/${id}`, time_slotData, {
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
              <h2>TimeSlot Profile</h2>
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
                  <label htmlFor="name">Time Slot</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={time_slotData.start + '.00 - ' + time_slotData.end + '.00'}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number_of_vehicles">Number Of Vehicles</label>
                  <input
                    type="number"
                    name="number_of_vehicles"
                    className="form-control"
                    id="number_of_vehicles"
                    value={time_slotData.number_of_vehicles}
                    onChange={(e) =>
                      setTimeSlotData({
                        ...time_slotData,
                        number_of_vehicles: e.target.value,
                      })
                    }
                    placeholder="Number Of Vehicles"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
