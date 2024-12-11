import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";
import BarsForm from "./BarsForm";

const BarsList = ({ onSelectBar }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        setBars(Array.isArray(bars) ? bars : []); // Ensure bars is always an array
      } catch (error) {
        console.error("Error fetching bars:", error);
      }
    };
    fetchBars();
  }, []);

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Bars</h2>
      <ul>
        {bars.map((bar) => (
          <li
            key={bar.id}
            onClick={() => onSelectBar(bar.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{bar.title}</h3>
            <p>
              Content: {bar.content} <br />
              Genre: {bar.genre} <br />
              Author: {bar.authorName} <br />
              Description: {bar.authorDescription} <br />
            </p>
          </li>
        ))}
      </ul>
      <BarsForm setBars={setBars}/>
    </div>
  );
};

export default BarsList;
