import React, { useState, useEffect, Component } from "react";
import Navbar from "./Partials/navbar";
import Sidebar from "./Partials/sidebar";

const Home = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const tokenObject = JSON.parse(localStorage.getItem("tokenObject"));
    if (tokenObject) {
      setUser(tokenObject);
    } else {
      window.location = "/";
    }
  }, []);

  return (
    <div className="wrapper">
    {/* <div className="wrapper my-custom-scrollbar my-custom-scrollbar-primary">*/}
      <Sidebar />

      <div id="content">
        <Navbar />
      </div>
      
    </div>
  );
};
export default Home;
