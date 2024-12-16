import React, { useEffect, useState } from "react";
import "../css/SearchBarStyle.css";
import facade from "../util/apiFacade";

const SearchBar = ({ onSearchResults }) => {
  const [bars, setBars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const data = await facade.fetchData("/api/bars");
        setBars(data);
      } catch (error) {
        console.error("Error fetching bars:", error);
      }
    };

    fetchBars();
  }, []);

  const handleSearch = () => {
    if (!submittedQuery) {
      onSearchResults(bars);
      return;
    }

    const filteredBars = bars.filter(
      (bar) =>
        bar.title.toLowerCase().includes(submittedQuery.toLowerCase()) ||
        bar.content.toLowerCase().includes(submittedQuery.toLowerCase())
    );
    onSearchResults(filteredBars);
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
          placeholder="Search by title or content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchBar;
