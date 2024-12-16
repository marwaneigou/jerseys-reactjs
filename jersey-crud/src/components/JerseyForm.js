import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JerseyForm.css";

const JerseyForm = ({ jerseys, saveJerseys }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", color: "", image: "" });

  useEffect(() => {
    if (id) {
      const jersey = jerseys.find((j) => j.id === parseInt(id));
      if (jersey) setFormData(jersey);
    }
  }, [id, jerseys]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJerseys = id
      ? jerseys.map((j) => (j.id === parseInt(id) ? { ...formData, id: parseInt(id) } : j))
      : [...jerseys, { ...formData, id: Date.now() }];

    saveJerseys(updatedJerseys);
    navigate("/");
  };

  return (
    <div className="jersey-form-container">
      <h1>{id ? "Modifier le Maillot" : "Ajouter un Nouveau Maillot"}</h1>
      <form onSubmit={handleSubmit} className="jersey-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
          className="form-input"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-textarea"
          required
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Couleur"
          className="form-input"
          required
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Lien de l'image"
          className="form-input"
          required
        />
        <div className="form-buttons">
          <button type="submit" className="form-button">
            Enregistrer
          </button>
          <button
            type="button"
            className="form-button go-back-button"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
        </div>
      </form>
    </div>
  );
};

export default JerseyForm;
