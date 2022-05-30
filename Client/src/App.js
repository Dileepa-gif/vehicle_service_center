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

            
            </Switch>
        </Router>
    </div>
  );
}

export default App;
