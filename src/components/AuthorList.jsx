import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import "../css/Author.css";

const AuthorList = ({ onSelectAuthor }) => {
  const [authors, setAuthors] = useState([]);

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
  

  return (
    <div className="author-list-container">
      <h2 className="author-list-header">Authors</h2>
      <div className="author-list-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <h3 className="author-name">{author.name}</h3>
            <p className="author-description">{author.description}</p>
            <button onClick={() => deleteAuthorById(author.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
