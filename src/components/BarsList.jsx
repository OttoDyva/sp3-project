import React, { useEffect, useState } from "react";
import facade from "../util/apiFacade";

const BarsList = ({ onSelectBar }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const fetchBars = async () => {
      const bars = await facade.fetchData("/api/bars");
      setBars(bars);
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
    </div>
  );
};

export default BarsList;
