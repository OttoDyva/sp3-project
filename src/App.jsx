import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from './components/Navbar';

// CSS
import './App.css'
import BarsForm from "./components/BarsForm";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <>
      <Navbar />
      <div className="box">
        <Header />
        <div>
          <h4>Search</h4>
        </div>
        <Routes>
          <Route path="/AuthorsList" element={<AuthorList />} />
          <Route
            path="/BarsList"
            element={
              <BarsList
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
              />
            }
          />
          <Route path="/BarsForm" element={<BarsForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
