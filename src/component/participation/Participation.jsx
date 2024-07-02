import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Participation = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  console.log('formData:', formData);

  const [participations, setParticipations] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/participation")
      .then(response => {
        console.log("Participation data:", response.data);
        setParticipations(response.data);
      })
      .catch(error => console.error("Error fetching participations:", error));

    axios.get("http://localhost:8000/employe")
      .then(response => {
        console.log("Employees data:", response.data);
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

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A3';
    const orientation = 'landscape';
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = 'Liste des Participants';
    const headers = [['Nom Employe', 'Diplome', 'Nom Formation', 'Date Début',  'Date Fin','Adresse', 'Etat']];
    const data = participations.map((participation) => {
      const employe = employes.find(emp => emp.id === participation.idEmploye);
      const formation = formations.find(form => form.id === participation.idFormation);
      return [
        employe ? employe.nom : "",
        employe ? employe.diplome : "",
        formation ? formation.nom : "",
        formation ? formation.date_debut : "",
        formation ? formation.date_fin : "",
        formation ? formation.adresse : "",
        formation ? formation.etat : "",
      ];
    });

    doc.text(title, marginLeft, 40);
    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
    });
    doc.save('participants_report.pdf');
  };


  return (
    <div className="employee-list-container">
      <h2>Liste des Participants</h2>
      <button onClick={exportPDF} className="btn btn-primary">Exporter au format PDF</button>
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
          </tr>
        </thead>
        <tbody>
          {participations.map((participation, index) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Participation;