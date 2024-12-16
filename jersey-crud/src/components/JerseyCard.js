import React from "react";
import { Link } from "react-router-dom";
import "./JerseyCard.css";

const JerseyCard = ({ jersey, onDelete }) => (
  <div className="jersey-card">
    <img src={jersey.image} alt={jersey.name} className="jersey-card-image" />
    <div className="jersey-card-content">
      <h3>{jersey.name}</h3>
      <p>{jersey.description}</p>
      <p>
        Couleur: <span className="jersey-color">{jersey.color}</span>
      </p>
      <div className="jersey-card-actions">
        <Link to={`/edit/${jersey.id}`} className="edit-button">
          Modifier
        </Link>
        <button onClick={() => onDelete(jersey.id)} className="delete-button">
          Supprimer
        </button>
      </div>
    </div>
  </div>
);

export default JerseyCard;
