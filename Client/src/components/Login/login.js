import { Link } from "react-router-dom";

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

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const [adminFormError, setAdminFormError] = useState("");

  const loginAdmin = (e) => {
    e.preventDefault();
    console.log("sent data = " + adminData.email + ".." + adminData.password);

    axios.post("/admin/login", adminData).then((res) => {
      if (res.data.success) {
        localStorage.setItem(
          "tokenObject",
          JSON.stringify(res.data.tokenObject)
        );
        window.location = "/home";
      } else {
        setAdminFormError(res.data.message);
      }
    });
  };




  const [employeeData, setEmployeeData] = useState({
    email: "",
    password: "",
  });

  const [employeeFormError, setEmployeeFormError] = useState("");

  const loginEmployee = (e) => {
    e.preventDefault();
    console.log("sent data = " + employeeData.email + ".." + employeeData.password);

    axios.post("/employee/login", employeeData).then((res) => {
      if (res.data.success) {
        localStorage.setItem(
          "tokenObject",
          JSON.stringify(res.data.tokenObject)
        );
        window.location = "/home";
      } else {
        setAdminFormError(res.data.message);
      }
    });
  };




  return (
    <div className="container-fluid ">
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center">
          <div className="login-content">
            <form action="" method="post" onSubmit={loginAdmin}>
              <h3 className="title">Login as an admin</h3>
              {adminFormError && <p className="error"> {adminFormError} </p>}

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    required
                    type="email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        email: e.target.value,
                      })
                    }
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
                    required
                    type="password"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        password: e.target.value,
                      })
                    }
                  />

                  <label>Password</label>
                </div>
              </div>

              <a href="#">Forgot Password?</a>
              <input type="submit" className="btn" />
            </form>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <div className="login-content">
          <form action="" method="post" onSubmit={loginEmployee}>
              <h3 className="title">Login as an employee</h3>
              {employeeFormError && <p className="error"> {employeeFormError} </p>}

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    required
                    type="email"
                    value={employeeData.email}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
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
                    required
                    type="password"
                    value={employeeData.password}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        password: e.target.value,
                      })
                    }
                  />

                  <label>Password</label>
                </div>
              </div>

              <a href="#">Forgot Password?</a>
              <input type="submit" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
