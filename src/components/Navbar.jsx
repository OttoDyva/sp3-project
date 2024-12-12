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

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      setLoggedIn(true);
      setUsername(user);
    });
    console.log(user, pass);
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
          <li>
                <Link to="/UserForm">Create User</Link>
              </li>
          </ul>
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
