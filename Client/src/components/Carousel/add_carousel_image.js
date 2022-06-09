import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import Navbar from "../Partials/navbar";
import Sidebar from "../Partials/sidebar";
import DefaultImage from "./default.png";
import "../../App.css";

export default function AddCarouselImage(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
    } else {
      window.location = "/";
    }
  }, []);

  const [carouselData, setCarouselData] = useState({
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(DefaultImage);

  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (carouselData.image === "") {
      setMessage({
        status: true,
        success: false,
        message: "Please select a image",
      });
    } else {
      axios
        .post(`/carousel/create`, carouselData, {
          headers: {
            Authorization: user.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setCarouselData({
              image: "",
            });
            setPreviewImage(DefaultImage);
            window.location = "/carousel_image_list";
          } else {
            setMessage({
              status: true,
              success: false,
              message: res.data.message,
            });
          }
        });
    }
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
              <h2>Add New Carousel Image</h2>
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

                
                <div className="col-12 p-0 ">
                  <img
                    src={previewImage}
                    alt="Category Image"
                    style={{ height: "150px", width: "200px" }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <FileBase
                    type="file"
                    name="image"
                    className="form-control"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setCarouselData({ ...carouselData, image: base64 });
                      setPreviewImage(base64);
                    }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
