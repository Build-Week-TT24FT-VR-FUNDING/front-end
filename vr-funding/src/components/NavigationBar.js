import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "antd";

import "../App.css";

const NavigationBar = () => {
  const history = useHistory();

  const handleHome = (e) => {
    history.push("/");
  };

  const handleLogout = (e) => {
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <nav className="navbar">
      <Button onClick={handleHome}>Home</Button>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Button>Dashboard</Button>
      </Link>

      <Link to="/projects" style={{ textDecoration: "none" }}>
        <Button>Projects</Button>
      </Link>

      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button>Login</Button>
      </Link>

      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button>Sign Up</Button>
      </Link>

      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button onClick={handleLogout}>Logout</Button>
      </Link>
    </nav>
  );
};

export default NavigationBar;
