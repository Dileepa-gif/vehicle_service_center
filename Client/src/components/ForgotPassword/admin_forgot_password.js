import "../Login/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

export default function Login(props) {
  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      window.location = "/home";
    }
  }, []);


  const [formError, setFormError] = useState("");

  const [adminData, setAdminData] = useState({
    email: ""
  });


  const passwordReset = (e) => {
    e.preventDefault();
    console.log(
      "sent data = " + adminData.email 
    );

    axios.post("/admin/passwordReset", adminData).then((res) => {
      if (res.data.success) {
        alert("Please check your email.")
        window.location = "/admin_login";
      } else {
        setFormError(res.data.message);
      }
    });
  };

  return (
    <div className="container-fluid login-body">
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center topic-col">
          <h1 className="topic">VEHICLE SERVICE CENTER</h1>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center">
          <div className="login-content center">
            <form action="" method="post" onSubmit={passwordReset}>
              <h4 className="title">Please enter your email.</h4>
              {formError && (
                <p className="error"> {formError} </p>
              )}

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        email: e.target.value,
                      })
                    }
                    required
                    maxlength="250"
                  />
                  <label>Email</label>
                </div>
              </div>
              <input type="submit" className="login_btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
