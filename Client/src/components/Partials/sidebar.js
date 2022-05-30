/** @format */

import React, { useState, useEffect } from "react";

export default function Sidebar(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
    }
  }, []);

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <a href="/home"><h3>Vehicle Service Center</h3></a>
      </div>

      <ul className="list-unstyled components">
      {user && user.sub.status=== 'ADMIN' && 
        <li>
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Employee
          </a>
          <ul className="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="/employee_list">Employee List</a>
            </li>
            <li>
              <a href="/add_employee">Add Employee</a>
            </li>
          </ul>
        </li>}
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a
            href="#pageSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Pages
          </a>
          <ul className="collapse list-unstyled" id="pageSubmenu">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Portfolio</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <ul className="list-unstyled CTAs">
        <li>
          <a
            href="https://bootstrapious.com/tutorial/files/sidebar.zip"
            className="download"
          >
            Download source
          </a>
        </li>
        <li>
          <a
            href="https://bootstrapious.com/p/bootstrap-sidebar"
            className="article"
          >
            Back to article
          </a>
        </li>
      </ul>
    </nav>
  );
}
