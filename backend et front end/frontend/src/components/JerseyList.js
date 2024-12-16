import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import JerseyCard from "./JerseyCard";
import "./JerseyList.css"; 

const JerseyList = () => {
  const [jerseys, setJerseys] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/jerseys").then((res) => {
      setJerseys(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/jerseys/${id}`).then(() => {
      setJerseys((prev) => prev.filter((jersey) => jersey.id !== id));
    });
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
        {filteredJerseys.map((jersey) => (
          <JerseyCard key={jersey.id} jersey={jersey} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default JerseyList;
