import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import GenreFilter from "./GenreFilter";
import SearchBar from "./SearchBar";

const BarsList = ({ onSelectBar, selectedGenre, onSelectGenre }) => {
  const [bars, setBars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);
  const [editingBar, setEditingBar] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    onSelectGenre("");
    const fetchBars = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        setBars(bars);
        setFilteredBars(bars);
      } catch (error) {
        console.error("Error fetching bars:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        const uniqueGenres = [...new Set(bars.map((bar) => bar.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchBars();
    fetchGenres();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = bars;

      if (selectedGenre) {
        filtered = filtered.filter((bar) => bar.genre === selectedGenre);
      }

      if (searchResults.length > 0) {
        filtered = filtered.filter((bar) =>
          searchResults.includes(bar.id)
        );
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
      const editedBar = await facade.editData(
        `/api/bars/${barId}`,
        editFormData
      );
      setBars(bars.map((bar) => (bar.id === barId ? editedBar : bar)));
      setEditingBar(null);
    } catch (error) {
      console.error("Error editing bar:", error);
    }
  };

  const handleEditClick = (bar) => {
    setEditingBar(bar.id);
    setEditFormData({
      ...bar,
      date: Array.isArray(bar.date) ? bar.date.join("-") : bar.date || "",
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
          <li key={bar.id} style={{ cursor: "pointer" }}>
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
              <div>
                <h3>{bar.title}</h3>
                <p>
                  Content: {bar.content} <br />
                  Genre: {bar.genre} <br />
                  Date: {bar.date.join("-")} <br />
                  Author: {bar.authorName} <br />
                  Description: {bar.authorDescription} <br />
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
