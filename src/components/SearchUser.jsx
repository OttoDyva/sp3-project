import React, { useEffect, useState } from "react";

// CSS
import "../css/SearchBarStyle.css";

// Util
import facade from "../util/apiFacade";

const SearchUser = ({ onSearchResults }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await facade.fetchData("/api/auth/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(submittedQuery.toLowerCase())
    );
    onSearchResults(filteredUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  useEffect(() => {
    handleSearch();
  }, [submittedQuery]);

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchUser;
