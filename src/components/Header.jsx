import { NavLink } from "react-router-dom";
import React from "react";

// CSS
import "../css/Head.css";

function Header() {
  return (
    <header>
      <nav className="header-design">
        <ul>
          <li>
            <NavLink 
              to="/BarsList" 
              className={({ isActive }) => isActive ? "active-link" : ""}>
              Bars
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/AuthorsList" 
              className={({ isActive }) => isActive ? "active-link" : ""}>
              Authors
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/BarsForm" 
              className={({ isActive }) => isActive ? "active-link" : ""}>
              Create Bar
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

