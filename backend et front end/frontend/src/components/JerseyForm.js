import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./JerseyForm.css";

const JerseyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", color: "", image: null });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/jerseys/${id}`).then((res) => {
        setFormData(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));

    const apiCall = id
      ? axios.put(`http://localhost:5000/api/jerseys/${id}`, formDataToSend)
      : axios.post("http://localhost:5000/api/jerseys", formDataToSend);

    apiCall.then(() => navigate("/"));
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
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="form-input"
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
