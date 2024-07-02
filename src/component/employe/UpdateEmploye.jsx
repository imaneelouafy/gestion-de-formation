import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import "./employe.css";

const UpdateEmploye = ({ employeId, onUpdateEmploye, onCloseUpdate }) => {
  const [updatedEmployeData, setUpdatedEmployeData] = useState({
    nom: '',
    prenom: '',
    age: '',
    tele: '',
    email: '',
    diplome: '',
    nombreFormation: ''
  });
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/employe/${employeId}`)
      .then(response => setUpdatedEmployeData(response.data))
      .catch(error => console.error("Erreur lors de la récupération des données de l'employé :", error));
  }, [employeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeData({
      ...updatedEmployeData,
      [name]: value,
    });
  };

  const handleUpdateEmploye = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/employe/${employeId}`, updatedEmployeData);
      onUpdateEmploye(employeId, updatedEmployeData);
      onCloseUpdate(); // Fermer le formulaire de mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé :", error);
    }
  };
  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h2>Modifier Employé</h2>
            <form className='update' onSubmit={handleUpdateEmploye}>
        <div>
          <label htmlFor="nom">Nom :</label>
          <input type="text" name="nom" value={updatedEmployeData.nom} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input type="text" name="prenom" value={updatedEmployeData.prenom} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="age">Âge :</label>
          <input type="number" name="age" value={updatedEmployeData.age} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="tele">Téléphone :</label>
          <input type="text" name="tele" value={updatedEmployeData.tele} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" value={updatedEmployeData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="diplome">Diplome :</label>
          <input type="text" name="diplome" value={updatedEmployeData.diplome} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="nombreFormation">NombreFormation :</label>
          <input type="text" name="nombreFormation" value={updatedEmployeData.nombreFormation} onChange={handleInputChange} />
        </div>
        <button type="submit">Enregistrer les modifications</button>
        </form>
          </div>
        </Modal>
      )}
    </div>
  );

};

export default UpdateEmploye;