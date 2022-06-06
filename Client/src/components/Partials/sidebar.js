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
        <a href="/home">
          <h3 className="small-topic">Vehicle Service Center</h3>
        </a>
      </div>

      <ul className="list-unstyled components">
        {user && user.sub.status === "ADMIN" && (
          <li>
            <a
              href="#admin"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Admin
            </a>
            <ul className="collapse list-unstyled" id="admin">
              <li>
                <a href="/admin_list">Admin List</a>
              </li>
              <li>
                <a href="/add_admin">Add Admin</a>
              </li>
            </ul>
          </li>
        )}

        {user && user.sub.status === "ADMIN" && (
          <li>
            <a
              href="#employee"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Employee
            </a>
            <ul className="collapse list-unstyled" id="employee">
              <li>
                <a href="/employee_list">Employee List</a>
              </li>
              <li>
                <a href="/add_employee">Add Employee</a>
              </li>
            </ul>
          </li>
        )}

        <li>
          <a
            href="#upgrade_type"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Upgrade Type
          </a>
          <ul className="collapse list-unstyled" id="upgrade_type">
            <li>
              <a href="/upgrade_type_list">Upgrade Types</a>
            </li>
            {user && user.sub.status === "ADMIN" && (
              <li>
                <a href="/add_upgrade_type">Add Upgrade Type</a>
              </li>
            )}
          </ul>
        </li>

        <li>
          <a href="/time_slot_list">Time Slot </a>
        </li>

        <li>
          <a
            href="#appointment"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Appointment
          </a>
          <ul className="collapse list-unstyled" id="appointment">
            <li>
              <a href="/all_appointment_list">All Appointments</a>
            </li>
            <li>
              <a href="/not_arrived_appointment_list">
                Not Arrived Appointments
              </a>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#service"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Service
          </a>
          <ul className="collapse list-unstyled" id="service">
            <li>
              <a href="/all_services_list">All Services</a>
            </li>
            <li>
              <a href="/active_services_list">Active Services</a>
            </li>
            <li>
              <a href="/service_history_list">Service History</a>
            </li>
          </ul>
        </li>

        <li>
          <a href="/all_vehicles_list">Vehicles</a>
        </li>

        <li>
          <a href="/all_advertisement_list">Advertisements</a>
        </li>

        <li>
          <a
            href="#summary"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            Summary
          </a>
          <ul className="collapse list-unstyled" id="summary">
            <li>
              <a href="/appointments_relevant_to_today">Appointments relevant to today</a>
            </li>
            <li>
              <a href="/services_relevant_to_today">Services relevant to today</a>
            </li>
          </ul>
        </li> 

      </ul>

      <ul className="list-unstyled CTAs">
        {user && user.sub.status === "ADMIN" && (
          <li>
            <a href="/edit_system_status">System Status </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
