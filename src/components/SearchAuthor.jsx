import React, { useEffect, useState } from "react";
import "../css/SearchBarStyle.css";
import facade from "../util/apiFacade";

const SearchAuthor = ({ onSearchResults }) => {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await facade.fetchData("/api/authors");
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearch = () => {
    const filteredAuthors = authors.filter(
      (author) =>
        author.name.toLowerCase().includes(submittedQuery.toLowerCase()) ||
        author.description.toLowerCase().includes(submittedQuery.toLowerCase())
    );
    onSearchResults(filteredAuthors);
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
          placeholder="Search by author name or description"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchAuthor;
