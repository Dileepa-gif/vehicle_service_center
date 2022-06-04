/** @format */
import React, { useState, useEffect, Component  } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";



import Login from "./components/Login/login";
import Home from "./components/Home";

import AdminList from "./components/Admin/admin_list";
import AddAdmin from "./components/Admin/add_admin";
import EditAdmin from "./components/Admin/edit_admin";

import EmployeeList from "./components/Employee/employee_list";
import AddEmployee from "./components/Employee/add_employee";
import EditEmployee from "./components/Employee/edit_employee";

import UpgradeTypeList from "./components/UpgradeType/upgrade_type_list";
import AddUpgradeType from "./components/UpgradeType/add_upgrade_type";
import EditUpgradeType from "./components/UpgradeType/edit_upgrade_type";

import TimeSlotList from "./components/TimeSlot/time_slot_list";
import EditTimeSlot from "./components/TimeSlot/edit_time_slot";

import EditSystemStatus from "./components/SystemStatus/edit_system_status";

import AllAppointmentList from "./components/Appointment/all_appointment_list";
import NotArrivedAppointmentList from "./components/Appointment/not_arrived_appointment_list";
import EditAppointmentStatus from "./components/Appointment/edit_appointment_status";

import AllServicesList from "./components/Service/all_services_list";
import ActiveServicesList from "./components/Service/active_services_list";
import ServiceHistoryList from "./components/Service/service_history_list";

import ActiveService from "./components/Service/active_service";
import CompletedService from "./components/Service/completed_service";
import Bill from "./components/Service/bill";

import AllVehiclesList from "./components/Vehicle/all_vehicles_list";
import ServiceHistoryByVehicle from "./components/Vehicle/service_history_by_vehicle";

import AllAdvertisementList from "./components/Advertisement/all_advertisement_list";
import Advertisement from "./components/Advertisement/advertisement";



function App() {
  
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />

              <Route path="/admin_list" component={AdminList} />
              <Route path="/add_admin" component={AddAdmin} />
              <Route path="/edit_admin/:id" component={EditAdmin} />

              <Route path="/employee_list" component={EmployeeList} />
              <Route path="/add_employee" component={AddEmployee} />
              <Route path="/edit_employee/:id" component={EditEmployee} />

              <Route path="/upgrade_type_list" component={UpgradeTypeList} />
              <Route path="/add_upgrade_type" component={AddUpgradeType} />
              <Route path="/edit_upgrade_type/:id" component={EditUpgradeType} />

              <Route path="/time_slot_list" component={TimeSlotList} />
              <Route path="/edit_time_slot/:id" component={EditTimeSlot} />

              <Route path="/edit_system_status" component={EditSystemStatus} />

              <Route path="/all_appointment_list" component={AllAppointmentList} />
              <Route path="/not_arrived_appointment_list" component={NotArrivedAppointmentList} />
              <Route path="/edit_appointment_status/:id" component={EditAppointmentStatus} />

              <Route path="/all_services_list" component={AllServicesList} />
              <Route path="/active_services_list" component={ActiveServicesList} />
              <Route path="/service_history_list" component={ServiceHistoryList} />

              <Route path="/active_service/:id" component={ActiveService} />
              <Route path="/completed_service/:id" component={CompletedService} />
              <Route path="/bill/:id" component={Bill} />

              <Route path="/all_vehicles_list" component={AllVehiclesList} />
              <Route path="/service_history_by_vehicle/:id" component={ServiceHistoryByVehicle} />

              <Route path="/all_advertisement_list" component={AllAdvertisementList} />
              <Route path="/Advertisement/:id" component={Advertisement} />

            </Switch>
        </Router>
    </div>
  );
}

export default App;
