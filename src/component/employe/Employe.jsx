import React, { useEffect, useState } from "react";
import "./employe.css";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Employe() {
  const [employes, setEmployes] = useState([]);


  const url = "http://localhost:8000/employe";

  useEffect(() => {
    axios.get(url)
      .then(response => setEmployes(response.data))
      .catch(error => console.error("Une erreur s'est produite lors de la récupération des données :", error));
  }, []);

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A3';
    const orientation = 'portrait';
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);

    const title = 'Employes Liste';
    const headers = [['ID', 'Nom', 'Age', 'Téléphone',  'Email','Diplome', 'Nbre Formation']];
    const data = employes.map((employe) => [
      employe.id,
     `${employe.nom} ${employe.prénom}`,
      employe.age,
      employe.tele,
      employe.email,
      employe.diplome,
      employe.nombreFormation,
    ]);

    const content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('employes_report.pdf');
  };

  return (
    <div>
      <h2>Table des Employes</h2>
      <button onClick={exportPDF} className="btn btn-primary">Exporter au format PDF</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Age</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Diplôme</th>
            <th>Nombre Fomation</th>
          </tr>
        </thead>
        <tbody>

          {employes.map((employe, index) => (
            <tr key={index}>
              <td>{employe.id}</td>
              <td>{employe.nom}</td>
              <td>{employe.prenom}</td>
              <td>{employe.age}</td>
              <td>{employe.tele}</td>
              <td>{employe.email}</td>
              <td>{employe.diplome}</td>
              <td>{employe.nombreFormation}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
