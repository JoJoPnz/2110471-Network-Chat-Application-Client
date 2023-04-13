import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  //   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const handleUsernameChange = (e) => {
  //     setUsername(e.target.value);
  //   };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // w8 for implement here #P JoJo
    // Here you can add your code to send a POST request to the server to register the user
    // with the provided username, email, and password
    // Once the user is registered, you can navigate to a different page using `navigate('/path')`

    if (confirmPassword !== password ) {
      alert("password and confirm password are not match");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        alert("register failed");
      });
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <div className="button-resgiter-panel">
          <button type="submit" className="button-submit-register">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
