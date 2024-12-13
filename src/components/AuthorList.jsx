import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";
import "../css/Author.css";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await facade.fetchData("/api/authors");
        setAuthors(authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  const deleteAuthorById = async (authorId) => {
    try {
      await facade.deleteData(`/api/authors/${authorId}`);
      setAuthors(authors.filter((author) => author.id !== authorId));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`); // Navigate to the new page with the author's ID
  };

  return (
    <div className="author-list-container">
      <h2 className="author-list-header">Authors</h2>
      <div className="author-list-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <h3
              className="author-name clickable"
              onClick={() => handleAuthorClick(author.id)}
            >
              {author.name}
            </h3>
            <p className="author-description">{author.description}</p>
            <button onClick={() => deleteAuthorById(author.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
