import React, { useReducer, useState } from 'react';
import "./employe.css";
import axios from 'axios';
import {Form_Reducer_Default_Values, formReducer} from './FormsReducer';

export default function AddEmploye() {

  const [formValuesReducer, dispatch] = useReducer(formReducer, Form_Reducer_Default_Values);

  // Fonction pour gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
      dispatch({
        type: 'input_change',
        payload: {name, value},
      });
    };


  const handleSubmit = async  (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/employe', formValuesReducer);
      console.log(response.data);
      // Rediriger vers la page appropriée après la soumission du formulaire
      dispatch({
        type: 'reset_form',
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données : ', error); 
    }
    
  };

  return (
    <div>
      <h2>Ajouter Employé</h2>
      <div>
        <form id='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom">Nom :</label>
            <input type="text" name='nom' id='nom' value={formValuesReducer.nom} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="prenom">Prenom :</label>
            <input type="text" name='prenom' id='prenom' value={formValuesReducer.prenom} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="age">Age :</label>
            <input type="number" name='age' id='age' value={formValuesReducer.age} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="tele">Téléphone :</label>
            <input type="tel" name='tele' id='tele' value={formValuesReducer.tele} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input type="tel" name='email' id='email' value={formValuesReducer.email} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="diplome">Diplome :</label>
            <input type="text" name='diplome' id='diplome' value={formValuesReducer.diplome} onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor="nombreFormation">Nombre Formation :</label>
            <input type="number" name='nombreFormation' id='nombreFormation' value={formValuesReducer.nombreFormation} onChange={handleInputChange} required/>
          </div>
          <button type="submit">Ajouter Employé</button>
        </form>
      </div>
    </div>
  );
};
