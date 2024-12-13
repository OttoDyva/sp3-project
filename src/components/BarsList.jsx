import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import GenreFilter from "./GenreFilter";
import SearchBar from "./SearchBar";
import "../css/BarsListStyle.css";

const BarsList = ({ onSelectBar, selectedGenre, onSelectGenre }) => {
  const [bars, setBars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);
  const [editingBar, setEditingBar] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    onSelectGenre(""); // Reset genre filter when component is mounted

    const fetchBarsAndGenres = async () => {
      try {
        // Fetch bars
        const bars = await facade.fetchData("/api/bars");
        setBars(bars);
        setFilteredBars(bars);

        // Fetch unique genres
        const uniqueGenres = [...new Set(bars.map((bar) => bar.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarsAndGenres();
  }, [onSelectGenre]); // `onSelectGenre` as dependency to ensure it resets on component mount

  useEffect(() => {
    const applyFilters = () => {
      let filtered = bars;

      if (selectedGenre) {
        filtered = filtered.filter((bar) => bar.genre === selectedGenre);
      }

      if (searchResults.length > 0) {
        filtered = filtered.filter((bar) => searchResults.includes(bar.id));
      }

      setFilteredBars(filtered);
    };

    applyFilters();
  }, [bars, selectedGenre, searchResults]);

  const deleteBarById = async (barId) => {
    try {
      await facade.deleteData(`/api/bars/${barId}`);
      setBars(bars.filter((bar) => bar.id !== barId));
    } catch (error) {
      console.error("Error deleting bar:", error);
    }
  };

  const editBarById = async (barId) => {
    try {
      const editedBar = await facade.editData(`/api/bars/${barId}`, editFormData);
      setBars(bars.map((bar) => (bar.id === barId ? editedBar : bar)));
      setEditingBar(null);
  
      const authors = await facade.fetchData("/api/authors");
      const duplicateAuthors = authors.filter(
        (author) =>
          author.name.trim().toLowerCase() === editFormData.authorName.trim().toLowerCase() &&
          author.bars.length === 0
      );
  
      for (const duplicateAuthor of duplicateAuthors) {
        console.log(`Deleting duplicate author with ID: ${duplicateAuthor.id}`);
        await facade.deleteData(`/api/authors/${duplicateAuthor.id}`);
      }
    } catch (error) {
      console.error("Error editing bar:", error);
    }
  };
  

  const handleEditClick = (bar) => {
    const formattedDate = Array.isArray(bar.date)
      ? `${bar.date[0]}-${String(bar.date[1]).padStart(2, "0")}-${String(
          bar.date[2]
        ).padStart(2, "0")}`
      : "";
    setEditingBar(bar.id);
    setEditFormData({
      ...bar,
      date: formattedDate,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditingBar(null);
    setEditFormData({});
  };

  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3)
      return "Invalid Date";
    const [year, month, day] = dateArray;
    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year}`;
  };

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Bars</h2>

      <SearchBar
        onSearchResults={(results) =>
          setSearchResults(results.map((bar) => bar.id))
        }
      />
      <GenreFilter onSelectGenre={onSelectGenre} />

      <ul>
        {filteredBars.map((bar) => (
          <li className="listDesign" key={bar.id} style={{ cursor: "pointer" }}>
            {editingBar === bar.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title || ""}
                  onChange={handleInputChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="content"
                  value={editFormData.content || ""}
                  onChange={handleInputChange}
                  placeholder="Content"
                />
                <select
                  name="genre"
                  value={editFormData.genre || ""}
                  onChange={handleInputChange}
                  placeholder="Genre"
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="date"
                  value={editFormData.date || ""}
                  onChange={handleInputChange}
                  placeholder="Date"
                />
                <button onClick={() => editBarById(bar.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="barsListDesign">
                <h3>{bar.title}</h3>
                <p>
                  <div className="barsList-author">
                    By {bar.authorName} - {formatDate(bar.date)}{" "}
                  </div>
                  <div className="barsList-description">
                    Description: {bar.authorDescription}
                  </div>
                  <br />
                  <div className="quote">{bar.content}</div> <br />
                  <div className="genre">Genre: {bar.genre}</div> <br />
                </p>
                <button onClick={() => deleteBarById(bar.id)}>Delete</button>
                <button onClick={() => handleEditClick(bar)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarsList;
