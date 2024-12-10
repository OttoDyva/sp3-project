import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";

function App() {

  return (
    <>
      <h1>Hello</h1>
      <Header />
      <Routes>
        <Route path="/AuthorsList" element={<AuthorList />} />
        <Route path="/BarsList" element={<BarsList />} />
      </Routes>
    </>
  );
}

export default App;
