import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Components
import AuthorList from "./components/AuthorList";
import AuthorBars from "./components/AuthorBars";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import ProtectedRoute from "./components/ProtectedRoute";
import BarsForm from "./components/BarsForm";
import UserForm from "./components/UserForm";
import Homepage from "./components/Homepage";

// Home page CSS
import "./App.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [users, setUsers] = useState([]);
  const [bars, setBars] = useState([]);

  return (
    <>
      <Navbar />
      <div className="box">
        <Routes>
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/" element={<Navigate to="/Homepage" />} />
          <Route path="/AuthorsList" element={<AuthorList />} />
          <Route path="/authors/:authorId" element={<AuthorBars />} /> {}
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
          <Route path="/BarsForm" element={<BarsForm setBars={setBars} />} />
          <Route path="/UserForm" element={<UserForm setUser={setUsers} />} />
          <Route
            path="/UserList"
            element={
              <ProtectedRoute role="admin">
                <UserList users={users} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
