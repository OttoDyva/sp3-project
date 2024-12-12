import { useState } from "react";
import logo from "../assets/logo.png";
import "../css/NavbarStyle.css";
import LogIn from "./LogIn";
import LoggedIn from "./LoggedIn";
import facade from "../util/apiFacade";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade.login(user, pass).then(() => setLoggedIn(true));
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
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
        <div>
          <ul>
            <li>
              <p>Dont have an account yet?</p>
              <Link to="/UserForm">Create User</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
