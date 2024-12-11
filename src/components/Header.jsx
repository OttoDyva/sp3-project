import React from "react";
import { Link } from "react-router-dom";
import GenreFilter from "./GenreFilter";
import '../css/Head.css'

function Header({ onSelectGenre }) {
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
            <Link to="/">CREATE</Link>
          </li>
        </ul>
      </nav>
      <GenreFilter onSelectGenre={onSelectGenre} />
    </header>
  );
}

export default Header;
