import React from "react";
import { Link } from "react-router-dom";
import '../css/Head.css'

function Header() {
  return (
    <header>
      <nav className="header-design">
        <ul>
          <li>
            <Link to="/BarsList">BARS</Link>
          </li>
          <li>
            <Link to="/AuthorsList">AUTHORS</Link>
          </li>
          <li>
            <Link to="/BarsForm">CREATE</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
