import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './participation.css';

const ParticipationList = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const [participations, setParticipations] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [formations, setFormations] = useState([]);
  const [invitationContent, setInvitationContent] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to track selected employee
  const [filterValue, setFilterValue] = useState(""); // State pour stocker la valeur du filtre

  useEffect(() => {
    axios.get("http://localhost:8000/participation")
      .then(response => {
        console.log("Participation data:", response.data);
        setParticipations(response.data);
      })
      .catch(error => console.error("Error fetching participations:", error));

    axios.get("http://localhost:8000/employe")
      .then(response => {
        console.log("Employes data:", response.data);
        setEmployes(response.data);
      })
      .catch(error => console.error("Error fetching employes:", error));

    axios.get("http://localhost:8000/formation")
      .then(response => {
        console.log("Formations data:", response.data);
        setFormations(response.data);
      })
      .catch(error => console.error("Error fetching formations:", error));
  }, []);
  
  const handleInviterClick = (employe, formation) => {
    const content =` Vous êtes invité à la formation "${formation.nom}" animée par ${employe.nom} le ${formation.date_debut} à ${formation.adresse}.`;
    setInvitationContent(content);
  };

  // Function to handle click event for "Details" button
  const handleDetailsClick = (employe) => {
    setSelectedEmployee(employe);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value); // Met à jour la valeur du filtre
  };

  const filteredParticipations = participations.filter(participation => {
    const formation = formations.find(form => form.id === participation.idFormation);
    return formation && formation.nom.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <div className="employee-list-container">
      <h2>Liste des Participants</h2>
      <label id='filtlabel' htmlFor="">Filtrer by Formation: </label>
      <input
        id='filt'
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Filtrer par nom de formation..."
      />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nom Employe</th>
            <th>Diplome</th>
            <th>Nom Formation</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Adresse</th>
            <th>Etat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipations.map((participation, index) => {
            const employe = employes.find(emp => emp.id === participation.idEmploye);
            const formation = formations.find(form => form.id === participation.idFormation);
            return (
              <tr key={index}>
                <td>{employe ? employe.nom : ""}</td>
                <td>{employe ? employe.diplome : ""}</td>
                <td>{formation ? formation.nom : ""}</td>
                <td>{formation ? formation.date_debut : ""}</td>
                <td>{formation ? formation.date_fin : ""}</td>
                <td>{formation ? formation.adresse : ""}</td>
                <td>{formation ? formation.etat : ""}</td>
                <td>
                  <Link to={`/participation/update/${participation.id}`} className="btn btn-success mr-2">Modifier</Link>
                  <button className="btn btn-primary mr-2" onClick={() => handleDetailsClick(employe)}>
                    Details
                  </button>
                  <button className="btn btn-warning" onClick={() => handleInviterClick(employe, formation)}>
                    <i className="fas fa-envelope"></i> Inviter
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {invitationContent && <div className="invitation-message">{invitationContent}</div>}
      {selectedEmployee && (
        <div className="employee-details">
          <h3>Détails de l'employé</h3>
          <p><strong>Nom:</strong> {selectedEmployee.nom}</p>
          <p><strong>Diplôme:</strong> {selectedEmployee.diplome}</p> 
          <p><strong>Nombre de formations:</strong> {participations.filter(participation => participation.idEmploye === selectedEmployee.id).length}</p>
          <h4>Formations:</h4>
          <ul>
            {participations.filter(participation => participation.idEmploye === selectedEmployee.id).map((participation, index) => {
              const formation = formations.find(form => form.id === participation.idFormation);
              return (
                <li key={index}>
                  {formation ? `${formation.nom} - Début: ${formation.date_debut} / Fin: ${formation.date_fin}` : ""}
                </li>
              );
            })}
          </ul>
          {/* Add other employee details here */}
        </div>
      )}
    </div>
  );
};

export default ParticipationList;

