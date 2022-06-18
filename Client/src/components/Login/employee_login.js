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

  const [employeeData, setEmployeeData] = useState({
    email: "",
    password: "",
  });


  const loginEmployee = (e) => {
    e.preventDefault();
    console.log(
      "sent data = " + employeeData.email + ".." + employeeData.password
    );

    axios.post("/employee/login", employeeData).then((res) => {
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
        <div className="col d-flex justify-content-center topic-col">
          <h1 className="topic">VEHICLE SERVICE CENTER</h1>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center">
          <div className="login-content center">
            <form action="" method="post" onSubmit={loginEmployee}>
              <h3 className="title">Login as an employee</h3>
              {formError && <p className="error"> {formError} </p>}

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    value={employeeData.email}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
                    required
                    maxLength="250"
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
                    value={employeeData.password}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        password: e.target.value,
                      })
                    }
                    required
                    minLength="8"
                    maxLength="25"
                  />

                  <label>Password</label>
                </div>
              </div>

              <a href="/employee_forgot_password">Forgot Password?</a>
              <input type="submit" className="login_btn" />
            </form>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-4 d-flex justify-content-center">
          <a href="/admin_login">
            <button className="login_btn">Login as an admin</button>
          </a>
        </div>
      </div>
    </div>
  );
}
