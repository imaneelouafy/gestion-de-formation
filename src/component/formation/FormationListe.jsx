import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./formation.css";

const FormationListe = () => {
  const [formations, setFormations] = useState([]);

  const url = "http://localhost:8000/formation";

  useEffect(() => {
    axios.get(url)
      .then(response => setFormations(response.data))
      .catch(error => console.error("Une erreur s'est formée lors de la récupération des données :", error));
  }, []);

  const handleExportToPdf = () => {
    const input = document.getElementById("formation-table");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("formation-liste.pdf");
    });
  };

  return (
    <div>
      <h1>Liste de formations</h1>
      <div className="mb-3">
        <button onClick={handleExportToPdf} className="btn btn-primary">Export to PDF</button>
      </div>
      <table className="table" id="formation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Date Debut</th>
            <th>Date fin</th>
            <th>Adresse</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation, index) => (
            <tr key={index}>
              <td>{formation.id}</td>
              <td>{formation.nom}</td>
              <td>{formation.date_debut}</td>
              <td>{formation.date_fin}</td>
              <td>{formation.adresse}</td>
              <td>{formation.etat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormationListe;
