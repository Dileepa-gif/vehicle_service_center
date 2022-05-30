/** @format */
import React, { useState, useEffect, Component  } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";



import Login from "./components/Login/login";
import Home from "./components/Home";
import EmployeeList from "./components/Employee/employee_list";
import AddEmployee from "./components/Employee/add_employee";





function App() {
  
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/employee_list" component={EmployeeList} />
              <Route path="/add_employee" component={AddEmployee} />

            
            </Switch>
        </Router>
    </div>
  );
}

export default App;
