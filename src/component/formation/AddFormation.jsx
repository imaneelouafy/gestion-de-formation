import React, { useState } from 'react';
import axios from 'axios';
import "./formation.css";

const AddFormation = () => {
  const [formationData, setFormationData] = useState({
    nom: '',
    date_debut: '',
    date_fin: '',
    adresse: '',
    etat: 'programmer',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData({
      ...formationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if Date Fin is later than Date Début
    if (new Date(formationData.date_fin) <= new Date(formationData.date_debut)) {
      setErrorMessage('La date de fin doit être supérieure à la date de début.');
      return;
    } else {
      setErrorMessage('');
    }

    try {
      const response = await axios.post('http://localhost:8000/formation', formationData);
      console.log('Formation successfully added:', response.data);
      // Optionally, you can reset the form fields after successful submission
      setFormationData({
        nom: '',
        date_debut: '',
        date_fin: '',
        adresse: '',
        etat: 'programmer',
      });
      // Redirect to the formation list after successful submission
      window.location.href = '/formation/liste';
    } catch (error) {
      console.error('Error adding formation:', error);
    }
  };

  return (
    <div>
      <h2>Add Formation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:  </label>
          <input type="text" name="nom" value={formationData.nom} onChange={handleChange} />
        </div>
        <div>
          <label>Date Début: </label>
          <input type="date" name="date_debut" value={formationData.date_debut} onChange={handleChange} />
        </div>
        <div>
          <label>Date Fin: </label>
          <input type="date" name="date_fin" value={formationData.date_fin} onChange={handleChange} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <div>
          <label>Adresse: </label>
          <input type="text" name="adresse" value={formationData.adresse} onChange={handleChange} />
        </div>
        <div>
          <label>État: </label>
          <select name="etat" value={formationData.etat} onChange={handleChange}>
            <option value="programmer">Programmé</option>
          </select>
        </div>
        <div>
          <button id='button' type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default AddFormation;
