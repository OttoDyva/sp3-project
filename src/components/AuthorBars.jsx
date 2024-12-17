import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";

// CSS
import "../css/AuthorBars.css";

const AuthorBars = () => {
  const { authorId } = useParams(); 
  const [author, setAuthor] = useState(null); 

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorData = await facade.fetchData(`/api/authors/${authorId}`);
        setAuthor(authorData); 
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };
    fetchAuthor();
  }, [authorId]);

  if (!author) {
    return <p>Loading author details...</p>;
  }

  return (
    <div className="author-bars-container">
      <h2>{author.name}</h2>
      <p>{author.description}</p>
      <h3>Bars</h3>
      {author.bars && author.bars.length > 0 ? (
        <ul className="bars-list">
          {author.bars.map((bar) => (
            <li key={bar.id} className="bar-item">
              <p>
                <strong>Title:</strong> {bar.title}
              </p>
              <br />
              <p className="quote">
                {bar.content}
              </p>
              <br />
              <p>
                <strong>Date:</strong> {bar.date.join("-")}
              </p>
              <p>
                <strong>Genre:</strong> {bar.genre}
              </p>
              {/* Add edit and delete buttons here if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bars available for this author.</p>
      )}
    </div>
  );
};

export default AuthorBars;
