import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";

function App() {
  const [authors, setAuthors] = useState([]);

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch(
        "https://hotel.sejestedomain.dk/api/authors"
      );
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching bars:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <h1>Hello</h1>
      <Header />
      <Routes>
        <Route path="/" element={<AuthorList authors={authors} />} />
        <Route path="/BarsList" element={<BarsList />} />
      </Routes>
    </>
  );
}

export default App;
