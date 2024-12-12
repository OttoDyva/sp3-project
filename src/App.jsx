import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import AuthorList from "./components/AuthorList";
import Header from "./components/Header";
import BarsList from "./components/BarsList";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import ProtectedRoute from "./components/ProtectedRoute";

// CSS
import "./App.css";
import BarsForm from "./components/BarsForm";
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
