import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <>
      <h1>Hello</h1>
      <Header onSelectCategory={setSelectedGenre} />
      <Routes>
        <Route path="/AuthorsList" element={<AuthorList />} />
        <Route path="/BarsList" element={<BarsList selectedGenre={selectedGenre} />} />
      </Routes>
    </>
  );
}

export default App;
