import React, { useState, useEffect } from "react";

export default function Navbar(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
    }
  }, []);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button type="button" id="sidebarCollapse" className="btn btn-info">
          <i className="fas fa-align-left"></i>
        </button>
        <button
          className="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-align-justify"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              {user && user.sub.status === "ADMIN" && (
                <a href={`/edit_admin/${user.sub.id}`}>
                  <button type="button" className="btn btn-outline-primary">
                    <i className="fas fa-user"></i>
                    {"  "}
                    {user && <span>{user.sub.first_name}</span>}
                  </button>
                </a>
              )}
              {user && user.sub.status === "EMPLOYEE" && (
                <a href={`/edit_employee/${user.sub.id}`}>
                  <button type="button" className="btn btn-outline-primary">
                    <i className="fas fa-user"></i>
                    {"  "}
                    {user && <span>{user.sub.first_name}</span>}
                  </button>
                </a>
              )}
            </li>
            <li className="nav-item">
              <a onClick={logout}>
                <button type="button" className="btn btn-outline-warning">
                  <i className="fas fa-power-off"></i>
                  {"  "}
                  Logout
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
