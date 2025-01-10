import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import SearchAuthor from "./SearchAuthor";

// Util
import facade from "../util/apiFacade";

// CSS
import "../css/Author.css";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await facade.fetchData("/api/authors");
        setAuthors(authors);
        setFilteredAuthors(authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  const deleteAuthorById = async (authorId) => {
    try {
      await facade.deleteData(`/api/authors/${authorId}`);
      setAuthors((prev) => prev.filter((author) => author.id !== authorId));
      setFilteredAuthors((prev) =>
        prev.filter((author) => author.id !== authorId)
      );
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <div className="author-list-container">
      <div className="title">
        <h1>AUTHORS</h1>
      </div>

      <SearchAuthor onSearchResults={setFilteredAuthors} />
      <div className="author-list-grid">
        {filteredAuthors.map((author) => (
          <div key={author.id} className="author-card">
            {/* Author Name */}
            <h3
              className="author-name clickable"
              onClick={() => handleAuthorClick(author.id)}
            >
              {author.name}
            </h3>
            <p className="author-description">{author.description}</p>

            {facade.loggedIn() && (
              <>
                {facade.hasUserAccess("admin") && (
                  <div className="action-buttons">
                    <button onClick={() => deleteAuthorById(author.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
