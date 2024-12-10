import React, { useState } from "react";
import { Link } from "react-router-dom";
import facade from "../util/apiFacade";
import BarsList from "./BarsList";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/BarsList">BarsList</Link>
          </li>
           
        </ul>
      </nav>

    </header>
  );
}

export default Header;