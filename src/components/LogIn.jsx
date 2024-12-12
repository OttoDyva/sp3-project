import React, { useState } from "react";
import "../css/LoginStyle.css";
import { Link } from "react-router-dom";
import facade from "../util/apiFacade";

function LogIn({ login }) {
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
    <div className="loginStyle">
      <h2>Login</h2>
      <form onSubmit={performLogin}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button-and-link">
          <button type="submit">Login</button>
          <div className="account-options">
            <p>Don't have an account yet?</p>
            <Link to="/UserForm">Create User</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
