import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import "../css/AuthorBars.css";

const AuthorBars = () => {
  const { authorId } = useParams(); // Get the author ID from the URL
  const [author, setAuthor] = useState(null); // Stores author details

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorData = await facade.fetchData(`/api/authors/${authorId}`);
        setAuthor(authorData); // Set the fetched author data
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
              <p>
                <strong>Content:</strong> {bar.content}
              </p>
              <p>
                <strong>Date:</strong> {bar.date.join("-")}
              </p>
              <p>
                <strong>Genre:</strong> {bar.genre}
              </p>
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
