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
    email: "",
    password: "",
  });


  const loginAdmin = (e) => {
    e.preventDefault();
    console.log(
      "sent data = " + adminData.email + ".." + adminData.password
    );

    axios.post("/admin/login", adminData).then((res) => {
      if (res.data.success) {
        localStorage.setItem(
          "tokenObject",
          JSON.stringify(res.data.tokenObject)
        );
        window.location = "/home";
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
            <form action="" method="post" onSubmit={loginAdmin}>
              <h3 className="title">Login as an admin</h3>
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

              <div className="input-div pass">
                <div className="i">
                  <FontAwesomeIcon icon={faLock} />
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <input
                    type="password"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        password: e.target.value,
                      })
                    }
                    required
                    minlength="8"
                    maxlength="25"
                  />

                  <label>Password</label>
                </div>
              </div>

              <a href="/admin_forgot_password">Forgot Password?</a>
              <input type="submit" className="login_btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
