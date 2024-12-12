import React from "react";
import { Link } from "react-router-dom";
import "../css/Head.css";

function Header() {
  return (
    <header>
      <nav className="header-design">
        <ul>
          <li>
            <Link to="/BarsList">Bars</Link>
          </li>
          <li>
            <Link to="/AuthorsList">Authors</Link>
          </li>
          <li>
            <Link to="/BarsForm">Create Bar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
