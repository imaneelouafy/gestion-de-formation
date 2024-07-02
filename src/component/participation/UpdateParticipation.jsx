import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const UpdateParticipation = () => {
  const { id } = useParams(); // Use useParams hook to get URL params
  const [formations, setFormations] = useState([]);
  const [diplomes, setDiplomes] = useState([]);
  const [selectedDiplome, setSelectedDiplome] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [participationData, setParticipationData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/participation/${id}`)
      .then(response => {
        console.log("Participation data:", response.data);
        setParticipationData(response.data);
        setSelectedDiplome(response.data.idDiplome);
        setSelectedEmployee(response.data.idEmploye);
        setSelectedFormation(response.data.idFormation);
      })
      .catch(error => console.error("Error fetching participation data:", error));

    axios.get("http://localhost:8000/formation")
      .then(response => {
        console.log("Formations data:", response.data);
        setFormations(response.data.filter(formation => formation.etat.toLowerCase() === "programmer" ));
      })
      .catch(error => console.error("Error fetching formations:", error));
    
    axios.get("http://localhost:8000/employe")
      .then(response => {
        console.log("Employees data:", response.data);
        const uniqueDiplomes = new Set(response.data.map(employe => employe.diplome));
        setDiplomes(Array.from(uniqueDiplomes));
      })
      .catch(error => {
        console.error("Error fetching diplomes:", error);
      });
  }, [id]);

  const handleDiplomeChange = (e) => {
    setSelectedDiplome(e.target.value);
    setSelectedEmployee('');
  };

  useEffect(() => {
    if (selectedDiplome) {
      axios.get(`http://localhost:8000/employe?diplome=${selectedDiplome}`)
        .then(response => {
          console.log("Filtered employees data:", response.data);
          setFilteredEmployees(response.data);
        })
        .catch(error => console.error("Error filtering employes:", error));
    }
  }, [selectedDiplome]);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFormation || !selectedDiplome || !selectedEmployee) {
      console.error("Please fill out all required fields.");
      return;
    }

    const formData = {
      idEmploye: selectedEmployee,
      idDiplome: selectedDiplome,
      idFormation: selectedFormation,
    };
    console.log("Form Data:", formData);

    axios.put(`http://localhost:8000/participation/${participationData.id}`, formData)
      .then(response => {
        console.log("Data updated successfully:", response.data);
        window.location.href = '/participation/liste';
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Modifier la participation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sélectionnez une formation</label>
          <select value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
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
          <select value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="">-- Sélectionner un employé --</option>
            {filteredEmployees.map(employe => (
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

export default UpdateParticipation;
