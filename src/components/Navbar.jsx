import { useState } from "react";
import logo from "../assets/logo.png";
import "../css/NavbarStyle.css";
import LogIn from "./LogIn";
import LoggedIn from "./LoggedIn";
import facade from "../util/apiFacade";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
  };

  const login = async (user, pass) => {
    try {
      await facade.login(user, pass);
      setLoggedIn(true);
      setUsername(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <img src={logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="navbar-right">
        <div>
          {!loggedIn ? (
            <LogIn login={login} />
          ) : (
            <div className="user-info">
              <LoggedIn />
              <span className="username">
                Welcome <span className="usernamecolor">{username}</span>!
              </span>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
