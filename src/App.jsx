import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from './components/Navbar';
import BarsForm from "./components/BarsForm";

// CSS
import './App.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [bars, setBars] = useState([]); // State to manage bars

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
                bars={bars} // Pass bars state to BarsList if needed
              />
            }
          />
          <Route path="/BarsForm" element={<BarsForm setBars={setBars} />} /> {/* Pass setBars */}
        </Routes>
      </div>
    </>
  );
}

export default App;
