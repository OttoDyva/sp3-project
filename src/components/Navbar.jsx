import { useState, useEffect } from "react";
import logotwo from "../assets/logotwo.png";
import videoloop3 from "../assets/videoloop3.mp4";
import "../css/NavbarStyle.css";
import LogIn from "./LogIn";
import LoggedIn from "./LoggedIn";
import facade from "../util/apiFacade";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
    localStorage.setItem("username", username);
  }, [loggedIn, username]);

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
      setLoggedIn(true);
      setUsername(user);
      setModalOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const openModal = () => {
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  return (
    <nav className="navbar">
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

      {/* Modal rendering */}
      {isModalOpen && <LogIn login={login} closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
