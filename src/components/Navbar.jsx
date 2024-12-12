import { useState } from "react";
import logo from "../assets/logo.png";
import "../css/NavbarStyle.css";
import LogIn from "./LogIn";
import LoggedIn from "./LoggedIn";
import facade from "../util/apiFacade";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    navigate("/");
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
        <div>
        <ul>
          {facade.loggedIn() && (
            <>
              {facade.hasUserAccess("admin") && (
                <li>
                  <Link to="/UserList">Admin</Link>
                </li>
              )}
            </>
          )}
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
