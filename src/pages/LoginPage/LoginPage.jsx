import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { storage } from "../../utils/storage";
import { checkToken } from "../../utils/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        storage.setAccessToken(token);
        navigate("/chat");
      })
      .catch((err) => {
        alert("username or password is incorrect");
      });
  };

  useEffect(() => {
    if (checkToken()) {
      navigate("/chat");
    }
  }, []);

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <h1 className="signin-text"> Log In </h1>
      <br />
      <label className="label-text">Email</label>
      <div className="text-input">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label className="label-text">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-button">
        <button>Login</button>
      </div>

      <p className="text-signup">
        Don’t have an account yet?{" "}
        <NavLink to="/register" className="signup-button">
          Sign Up
        </NavLink>
      </p>
    </form>
  );
};

export default LoginPage;
