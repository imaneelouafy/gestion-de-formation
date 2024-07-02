import React from "react"
import image from "./Formation-Tech-UC-Today-1.png"
import Navbar from "./Navbar"
import "./style.css";

export default function Home() {
  
  return (
    <div>
      <div>
        <header>
        </header>
      </div>
      <div className="head_content">
        <div className="head_content-sentence">
          <h1 className="title">
            <span className="title1">Bienvenue</span>
            <span className="title2">sur notre site de gestion de </span>
          </h1>
        </div>
        <img src={image} alt="Description de l'image" />
        
      </div>

   
      <main>
          <div className="row mb-4">
            <div className="col-md-4">
              <h2 className="text-primary">A propos de nous</h2>
              <p>Notre site propose une plateforme de gestion de formation pour vous aider à organiser et suivre vos sessions de formation.</p>
            </div>
            <div className="col-md-4">
              <h2 className="text-primary">Nos formations</h2>
              <p>Découvrez nos formations disponibles et choisissez celles qui correspondent à vos besoins.</p>
            </div>
            <div className="col-md-4">
              <h2 className="text-primary">Contactez-nous</h2>
              <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p>
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-5">
          <p>&copy; 2024 Site de gestion de formation</p>
        </footer>
    </div>
  )
}