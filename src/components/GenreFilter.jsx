import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";

const GenreFilter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await facade.fetchData("/api/bars");
        const uniqueGenres = [...new Set(data.map((bar) => bar.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <label htmlFor="genre">Genre filter: </label>
      <select
        id="genre"
        onChange={(e) => onSelectGenre(e.target.value)}
      >
        <option value="">ALL</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
