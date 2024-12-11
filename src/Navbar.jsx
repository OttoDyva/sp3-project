import { useState } from "react";
import logo from "./assets/logo.png";
import "./Navbar.css";
import LogIn from "../components/Login";
import LoggedIn from "./components/LoggedIn";
import facade from "./util/apiFacade";

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
      </div>
    </nav>
  );
};

export default Navbar;
