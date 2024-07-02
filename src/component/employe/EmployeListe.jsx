import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployes,
  deleteEmployeAsync,
  updateEmploye,
} from "../redux/employeActions";
import UpdateEmploye from "./UpdateEmploye";

export default function EmployeListe() {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEmployeId, setSelectedEmployeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    nom: false,
    prenom: false,
    age: false,
    formation: false,
  });

  const dispatch = useDispatch();
  const employes = useSelector((state) => state.employes);

  useEffect(() => {
    dispatch(fetchEmployes());
  }, [dispatch]);


  const handleUpdateEmploye = (employeId, updatedData) => {
    dispatch(updateEmploye(employeId, updatedData));
  };

  const filteredEmployes = employes.filter((employe) => {
    return (
      (!filterOptions.nom ||
        (employe.nom &&
          employe.nom.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!filterOptions.prenom ||
        (employe.prenom &&
          employe.prenom.toLowerCase().includes(searchTerm.toLowerCase()))) 
    );
  });

  const handleDeleteEmploye = async (employeId) => {
    dispatch(deleteEmployeAsync(employeId));
  };

  const handleModifyClick = (employeId) => {
    setSelectedEmployeId(employeId);
    setShowUpdateForm(true);
  };

  const handleCloseUpdate = () => {
    setSelectedEmployeId(null);
    setShowUpdateForm(false);
  };

  const handleCheckboxChange = (name) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: !prevOptions[name],
    }));
  };

  return (
    <div>
      {showUpdateForm && selectedEmployeId !== null && (
        <UpdateEmploye
          employeId={selectedEmployeId}
          onUpdateEmploye={handleUpdateEmploye}
          onCloseUpdate={handleCloseUpdate}
        />
      )}

      <div id="recherche">
        <div>
          <label>Nom</label>
          <input
            type="checkbox"
            name="nom"
            checked={filterOptions.nom}
            onChange={() => handleCheckboxChange("nom")}
          />
        </div>
        <div>
          <label>Prenom</label>
          <input
            type="checkbox"
            name="prenom"
            checked={filterOptions.prenom}
            onChange={() => handleCheckboxChange("prenom")}
          />
        </div>
    
        <div id="search">
          <label htmlFor="recherche">Recherche par :</label>
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Age</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Diplome</th>
            <th>Nombre Fomation</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployes.map((employe, index) => (
            <tr key={index}>
              <td>{employe.id}</td>
              <td>{employe.nom}</td>
              <td>{employe.prenom}</td>
              <td>{employe.age}</td>
              <td>{employe.tele}</td>
              <td>{employe.email}</td>
              <td>{employe.diplome}</td>
              <td>{employe.nombreFormation}</td>
              <td>
                <button
                  id="modifier"
                  onClick={() => handleModifyClick(employe.id)}
                >
                  Modifier
                </button>
                <button
                  id="supprimer"
                  onClick={() => handleDeleteEmploye(employe.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}