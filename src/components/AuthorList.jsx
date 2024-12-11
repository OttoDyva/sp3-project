import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";

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
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li
            key={author.id}
            onClick={() => onSelectAuthor(author.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{author.name}</h3>
            <p>
              Description: {author.description} <br />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
