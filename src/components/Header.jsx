import React from "react";
import { Link } from "react-router-dom";
import GenreFilter from "./GenreFilter";

function Header({ onSelectCategory }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/BarsList">BarsList</Link>
          </li>
          <li>
            <Link to="/AuthorsList">AuthorsList</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <GenreFilter onSelectCategory={onSelectCategory} />
    </header>
  );
}

export default Header;
