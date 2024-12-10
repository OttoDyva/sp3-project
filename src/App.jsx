import { useState, useEffect } from "react";
import "./App.css";
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import apiFacade from "./util/apiFacade";

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
      <Header />
      <AuthorList authors={authors} />
    </>
  );
}

export default App;
