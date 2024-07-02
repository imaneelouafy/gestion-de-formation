import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Importing Button from React Bootstrap
import "./formation.css";

const Formation = () => {
  const [formations, setFormations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedFormation, setUpdatedFormation] = useState({
    id: null,
    nom: '',
    date_debut: '',
    date_fin: '',
    adresse: '',
    etat: ''
  });
  const [filterName, setFilterName] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterState, setFilterState] = useState("");
  const [formationToEdit, setFormationToEdit] = useState(null); // State for the formation being edited

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/formation");
      setFormations(response.data);
    } catch (error) {
      console.error("Error fetching formations:", error);
    }
  };const filteredFormations = formations.filter(formation => {
    if (filterName && !formation.nom.toLowerCase().includes(filterName.toLowerCase())) {
      return false;
    }
    if (filterStartDate && new Date(formation.date_debut) < new Date(filterStartDate)) {
      return false;
    }
    if (filterEndDate && new Date(formation.date_fin) > new Date(filterEndDate)) {
      return false;
    }
    if (filterState && formation.etat !== filterState) {
      return false;
    }
    return true;
  });
 

  const handleEdit = (formation) => {
    setUpdatedFormation(formation);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/formation/${id}`);
      console.log("Formation deleted successfully.");
      fetchData();
    } catch (error) {
      console.error("Error deleting formation:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdatedFormation({
      id: null,
      nom: '',
      date_debut: '',
      date_fin: '',
      adresse: '',
      etat: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormation({
      ...updatedFormation,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/formation/${updatedFormation.id}`, updatedFormation);
      setShowModal(false);
      console.log("Formation updated successfully.");
      fetchData();
    } catch (error) {
      console.error("Error updating formation:", error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Table des Formations</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="filterName">Filter by Name:</label>
          <input
            id="filterName"
            type="text"
            placeholder="Filter by Name"
            className="form-control"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="filterStartDate">Start Date:</label>
          <input
            id="filterStartDate"
            type="date"
            placeholder="Start Date"
            className="form-control"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="filterEndDate">End Date:</label>
          <input
            id="filterEndDate"
            type="date"
            placeholder="End Date"
            className="form-control"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="filterState">Etat:</label>
          <select
            id="filterState"
            className="form-select"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="">State</option>
            <option value="programmer">Programmer</option>
            <option value="en cours">En Cours</option>
            <option value="terminer">Terminer</option>
            <option value="annuler">Annuler</option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Date Debut</th>
            <th>Date fin</th>
            <th>Adresse</th>
            <th>Etat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFormations.map((formation, index) => (
            <tr key={index}>
              <td>{formation.id}</td>
              <td>{formation.nom}</td>
              <td>{formation.date_debut}</td>
              <td>{formation.date_fin}</td>
              <td>{formation.adresse}</td>
              <td>{formation.etat}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(formation)}>Modifier</Button> {/* Using React Bootstrap Button */}
                <Button variant="danger" onClick={() => handleDelete(formation.id)}>Supprimer</Button> {/* Using React Bootstrap Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing formations */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">Enregistrer</Button> {/* Using React Bootstrap Button */}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Formation;
