import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import GenreFilter from "./GenreFilter";
import "../css/BarsListStyle.css";

const BarsList = ({ onSelectBar, selectedGenre, onSelectGenre }) => {
  const [bars, setBars] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);
  const [editingBar, setEditingBar] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        setBars(Array.isArray(bars) ? bars : []);
      } catch (error) {
        console.error("Error fetching bars:", error);
      }
    };
    fetchBars();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      setFilteredBars(bars.filter((bar) => bar.genre === selectedGenre));
    } else {
      setFilteredBars(bars);
    }
  }, [bars, selectedGenre]);

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
    setEditFormData({ ...bar });
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
                <input
                  type="text"
                  name="genre"
                  value={editFormData.genre || ""}
                  onChange={handleInputChange}
                  placeholder="Genre"
                />
                <input
                  type="date"
                  name="date"
                  value={
                    editFormData.date
                      ? editFormData.date.split("-").slice(0, 3).join("-")
                      : ""
                  }
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
                  <div className="barsList-author">By {bar.authorName}  -  {bar.date.join("-")} </div>
                  <div className="barsList-description">Description: {bar.authorDescription}</div>
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
