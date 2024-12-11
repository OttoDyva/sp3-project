import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from './Navbar';
import './App.css'

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <>
      <Navbar />
      <div className="box">
        <h2>BARS</h2>
        <Header />
      <Routes>
        <Route path="/AuthorsList" element={<AuthorList />} />
        <Route path="/BarsList" element={<BarsList selectedGenre={selectedGenre} />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
