import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const { setToken, setIsLogin } = useTokenContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        setIsLogin(true);
        navigate("/chat");
      });
  };

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <h1 className="signin-text"> Log In </h1>
      <br />
      <label className="label-text">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label-text">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-button">
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
