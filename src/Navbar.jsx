import React from 'react';
import logo from './assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
        <img src={logo} className="logo react" alt="React logo" />
    </a>
  </div>
  <div className="navbar-right">
    <form className="App">
        <input type="Username" />
        <input type="Password" />
        <button>LOGIN</button>   
    </form>
  </div>
</nav>
);
};

export default Navbar;