import React, { useState } from "react";
import "../css/LoginStyle.css";
import { Link } from "react-router-dom";
import facade from "../util/apiFacade";

function LogIn({ login, closeModal }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [errorMessage, setErrorMessage] = useState("");

  const performLogin = async (evt) => {
    evt.preventDefault();
    try {
      await login(loginCredentials.username, loginCredentials.password);
      setErrorMessage("");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Wrong username or password");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="model-logo-close">
          <button className="close-btn" onClick={closeModal}>
            ×
          </button>
        </div>
        <div className="logintitle">
          <h2>Login</h2>
        </div>
        <form onSubmit={performLogin}>
          <div className="input-container">
            <input
              placeholder="Username"
              id="username"
              onChange={onChange}
              value={loginCredentials.username}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={onChange}
              value={loginCredentials.password}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-and-link">
            <button type="submit" className="login-button">Login</button>
            <div className="account-options">
              <p>Don't have an account yet?</p>
              <div onClick={closeModal}>
                <Link to="/UserForm">Create Account Here</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
