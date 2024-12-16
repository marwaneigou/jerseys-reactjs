import React, { useState } from "react";
import { Link } from "react-router-dom";
import JerseyCard from "./JerseyCard";
import "./JerseyList.css";

const JerseyList = ({ jerseys, saveJerseys }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const updatedJerseys = jerseys.filter((jersey) => jersey.id !== id);
    saveJerseys(updatedJerseys);
  };

  const moveUp = (index) => {
    if (index === 0) return; // Do nothing if it's the first jersey
    const updatedJerseys = [...jerseys];
    [updatedJerseys[index - 1], updatedJerseys[index]] = [
      updatedJerseys[index],
      updatedJerseys[index - 1],
    ];
    saveJerseys(updatedJerseys);
  };

  const moveDown = (index) => {
    if (index === jerseys.length - 1) return; // Do nothing if it's the last jersey
    const updatedJerseys = [...jerseys];
    [updatedJerseys[index], updatedJerseys[index + 1]] = [
      updatedJerseys[index + 1],
      updatedJerseys[index],
    ];
    saveJerseys(updatedJerseys);
  };

  const filteredJerseys = jerseys.filter((jersey) =>
    `${jersey.name} ${jersey.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jersey-list-container">
      <header className="jersey-list-header">
        <h1>Maillots de Football</h1>
        <Link to="/add" className="add-jersey-button">
          Ajouter un maillot
        </Link>
      </header>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Rechercher un maillot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="jersey-grid">
        {filteredJerseys.map((jersey, index) => (
          <div className="jersey-card-wrapper" key={jersey.id}>
            <JerseyCard jersey={jersey} onDelete={handleDelete} />
            <div className="move-buttons">
              <button onClick={() => moveUp(index)} className="move-up-button">
                Remonter
              </button>
              <button
                onClick={() => moveDown(index)}
                className="move-down-button"
              >
                Descendre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JerseyList;
