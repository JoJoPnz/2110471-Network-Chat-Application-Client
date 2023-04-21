import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../utils/storage";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`).then(() => {
      storage.clearAccessToken();
      navigate("/");
    });
  };

  return (
    <div className="navbar-container">
      <a href="/chat">Home</a>
      {/* we love mobiew */}
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <button
        className="logout-button"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
