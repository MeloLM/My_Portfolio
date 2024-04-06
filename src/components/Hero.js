import { React } from "react";
import '../App.css';
import "../style/Hero.css";


export default function Hero() {
  return (
    <>
      <section className="row hero-box">
      
        <div className="col-12 col-md-8 hero-content">
          <h2 className="mx-5 px-3">Welcome</h2>
          <p>Sono un giovane sviluppatore full stack con esperienza nel mondo dei siti web e una passione particolare per il lato tecnico. Ho seguito un corso intensivo dove ho imparato tanto sul front end quanto sul back end, grazie a un approccio pratico basato sugli oggetti. Ho anche capito come funziona il metodo Agile Scrum durante vari esercizi . Oltre a saper programmare, ho anche sviluppato buone capacità di comunicazione, gestione dello stress e risoluzione dei problemi.</p>
        </div>

        <div className="col-12 col-md-3 hero-img">
          <div>
            <div className="tech-icon">
              <img src="./assets/icon/react.png" alt="icona1" />
            </div>
            <img src="./assets/image/profile.jpg" className="rounded-4" alt="profile" />
          </div>  

          <div className="col-12">
            
            <div className="tech-icon">
              <img src="./assets/icon/github.png" className="rounded-5" alt="icona2" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/php.png" className="rounded-5" alt="icona3" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/lara.webp" className="rounded-3" alt="icona4" />
            </div>

          </div>

        </div>

      </section>

    </>
  );
}
