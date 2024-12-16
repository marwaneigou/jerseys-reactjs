import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JerseyList from "./components/JerseyList";
import JerseyForm from "./components/JerseyForm";
import jerseysData from "./data/jerseys.json";
import './App.css';


const App = () => {
  const [jerseys, setJerseys] = useState([]);

  useEffect(() => {
    const storedJerseys = localStorage.getItem("jerseys");
    if (storedJerseys) {
      setJerseys(JSON.parse(storedJerseys));
    } else {
      setJerseys(jerseysData);
    }
  }, []);

  const saveJerseys = (updatedJerseys) => {
    setJerseys(updatedJerseys);
    localStorage.setItem("jerseys", JSON.stringify(updatedJerseys));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<JerseyList jerseys={jerseys} saveJerseys={saveJerseys} />} />
        <Route path="/add" element={<JerseyForm saveJerseys={saveJerseys} jerseys={jerseys} />} />
        <Route path="/edit/:id" element={<JerseyForm saveJerseys={saveJerseys} jerseys={jerseys} />} />
      </Routes>
    </Router>
  );
};

export default App;
