import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from './components/Navbar';
import BarsForm from "./components/BarsForm";

// CSS
import './App.css'
import UserForm from "./components/UserForm";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [users, setUsers] = useState([]);
  const [bars, setBars] = useState([]);


  return (
    <>
      <Navbar />
      <div className="box">
        <Header />
        <Routes>
          <Route path="/AuthorsList" element={<AuthorList />} />
          <Route
            path="/BarsList"
            element={
              <BarsList
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
                bars={bars} 
              />
            }
          />
          <Route path="/BarsForm" element={<BarsForm setBars={setBars}/>} />
          <Route path="/UserForm" element={<UserForm setUser={setUsers} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
