import { useState, useEffect } from "react";
import logotwo from "../assets/logotwo.png";
import videoloop3 from "../assets/videoloop3.mp4";
import "../css/NavbarStyle.css";
import LogIn from "./LogIn";
import facade from "../util/apiFacade";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = facade.getToken();
    if (token) {
      try {
        // Extract roles and username from token
        const payloadBase64 = token.split(".")[1];
        const decodedClaims = JSON.parse(window.atob(payloadBase64));
        setUsername(decodedClaims.username);
        setLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  const login = async (user, pass) => {
    try {
      await facade.login(user, pass);
      const token = facade.getToken();
      const payloadBase64 = token.split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      setUsername(decodedClaims.username);
      setLoggedIn(true);
      setModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="version">
        <h4>Version: v.1.10.0</h4>
      </div>
      <video autoPlay loop muted playsInline className="navbar-video">
        <source src={videoloop3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logotwo} className="logo react" alt="React logo" />
        </Link>
        <Header />
      </div>

      <div
        className="navbar-right"
        style={loggedIn ? { backgroundColor: "rgba(0, 0, 0, 0.3)" } : {}}
      >
        <div className="user-info">
          {!loggedIn ? (
            <button onClick={openModal}>Login</button>
          ) : (
            <>
              <span className="username">
                Welcome <span className="usernamecolor">{username}</span>!
              </span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>

        {facade.loggedIn() && facade.hasUserAccess("admin") && (
          <ul className="admin-links">
            <li>
              <Link to="/UserList">Admin</Link>
            </li>
          </ul>
        )}
      </div>

      {isModalOpen && <LogIn login={login} closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
