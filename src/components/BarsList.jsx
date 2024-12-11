import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import GenreFilter from "./GenreFilter";
import BarsForm from "./BarsForm";

const BarsList = ({ onSelectBar, selectedGenre, onSelectGenre }) => {
  const [bars, setBars] = useState([]);
  const [filteredBars, setFilteredBars] = useState([]);

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
  

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Bars</h2>
    
      <GenreFilter onSelectGenre={onSelectGenre} />

      <ul>
        {filteredBars.map((bar) => (
          <li key={bar.id} style={{ cursor: "pointer" }}>
            <h3>{bar.title}</h3>
            <p>
              Content: {bar.content} <br />
              Genre: {bar.genre} <br />
              Author: {bar.authorName} <br />
              Description: {bar.authorDescription} <br />
            </p>
            <button onClick={() => deleteBarById(bar.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <BarsForm setBars={setBars} />
    </div>
  );
};

export default BarsList;
