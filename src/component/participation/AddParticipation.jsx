import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddParticipation = () => {
  const [formations, setFormations] = useState([]);
  const [diplomes, setDiplomes] = useState([]);
  const [selectedDiplome, setSelectedDiplome] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [filteredEmployes, setFilteredEmployes] = useState([]);
  const [selectedEmploye, setSelectedEmploye] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/formation")
      .then(response => {
        console.log("Formations data:", response.data);
        setFormations(response.data.filter(formation => formation.etat.toLowerCase() === "programmer"));
      })
      .catch(error => console.error("Error fetching formations:", error));
    
    axios.get("http://localhost:8000/employe")
      .then(response => {
        console.log("Employes data:", response.data);
        const uniqueDiplomes = new Set(response.data.map(employe => employe.diplome));
        setDiplomes(Array.from(uniqueDiplomes));
        setFilteredEmployes(response.data);
      })
      .catch(error => console.error("Error fetching employes:", error));
  }, []);

  const handleFormationChange = (e) => {
    setSelectedFormation(e.target.value);
  };

  const handleDiplomeChange = (e) => {
    setSelectedDiplome(e.target.value);
    setSelectedEmploye('');
    // Filter employes based on selected diploma
    setFilteredEmployes(
      e.target.value 
      ? filteredEmployes.filter(employe => employe.diplome === e.target.value) 
      : []
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFormation || !selectedDiplome || !selectedEmploye) {
      console.error("Please fill out all required fields.");
      return;
    }

    const formData = {
      idEmploye: selectedEmploye,
      idDiplome: selectedDiplome,
      idFormation: selectedFormation,
    };

    axios.post("http://localhost:8000/participation", formData)
      .then(response => {
        console.log("Data submitted successfully:", response.data);
        window.location.href = '/participation/liste';
      })
      .catch(error => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Invitation à une Formation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sélectionnez une formation</label>
          <select value={selectedFormation} onChange={handleFormationChange}>
            <option value="">-- Sélectionner une formation --</option>
            {formations.map(formation => (
              <option key={formation.id} value={formation.id}>{formation.nom}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sélectionnez un diplôme:</label>
          <select value={selectedDiplome} onChange={handleDiplomeChange}>
            <option value="">-- Sélectionner un diplôme --</option>
            {diplomes.map((diplome, index) => (
              <option key={index} value={diplome}>{diplome}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sélectionnez un employé:</label>
          <select value={selectedEmploye} onChange={(e) => setSelectedEmploye(e.target.value)}>
            <option value="">-- Sélectionner un employé --</option>
            {filteredEmployes.map(employe  => (
              <option key={employe.id} value={employe.id}>{employe.nom}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Enregistrer</button>
          <button><Link to="/participation/list" className="link">Annuler</Link></button>
        </div>
      </form>
    </div>
  );
};

export default AddParticipation;
