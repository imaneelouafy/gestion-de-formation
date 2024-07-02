import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./formation.css";

const UpdateFormation = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [showModal, setShowModal] = useState(true); // Set initial state to true

  const [updatedFormation, setUpdatedFormation] = useState({
    nom: '',
    date_debut: '',
    date_fin: '',
    adresse: '',
    etat: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/formation/${id}`);
        setUpdatedFormation(response.data);
      } catch (error) {
        console.error('Error fetching formation data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormation({
      ...updatedFormation,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/formation/${id}`, updatedFormation);
      setShowModal(false);
      console.log("Formation updated successfully.");
      nav("/formation/liste");
    } catch (error) {
      console.error("Error updating formation:", error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom:</label>
              <input type="text" className="form-control" id="nom" name="nom" value={updatedFormation.nom} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="date_debut" className="form-label">Date Debut:</label>
              <input type="date" className="form-control" id="date_debut" name="date_debut" value={updatedFormation.date_debut} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="date_fin" className="form-label">Date fin:</label>
              <input type="date" className="form-control" id="date_fin" name="date_fin" value={updatedFormation.date_fin} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="adresse" className="form-label">Adresse:</label>
              <input type="text" className="form-control" id="adresse" name="adresse" value={updatedFormation.adresse} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="etat" className="form-label">Etat:</label>
              <select className="form-select" id="etat" name="etat" value={updatedFormation.etat} onChange={handleChange}>
                <option value="programmer">Programmer</option>
                <option value="en cours">En Cours</option>
                <option value="terminer">Terminer</option>
                <option value="annuler">Annuler</option>
              </select>
            </div>
            <Button variant="primary" type="submit">Enregistrer</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateFormation;
