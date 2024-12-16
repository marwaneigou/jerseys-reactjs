import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JerseyList from "./components/JerseyList";
import JerseyForm from "./components/JerseyForm";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JerseyList />} />
        <Route path="/add" element={<JerseyForm />} />
        <Route path="/edit/:id" element={<JerseyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
