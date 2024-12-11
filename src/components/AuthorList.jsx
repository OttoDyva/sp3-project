import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import '../css/Author.css'

const AuthorList = ({ onSelectAuthor }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await facade.fetchData("/api/authors");
      setAuthors(authors);
    };
    fetchAuthors();
  }, []);

  return (
    <div className="author-list-container">
      <h2 className="author-list-header">Authors</h2>
      <div className="author-list-grid">
        {authors.map((author) => (
          <div
            key={author.id}
            onClick={() => onSelectAuthor(author.id)}
            className="author-card"
          >
            <h3 className="author-name">{author.name}</h3>
            <p className="author-description">{author.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
