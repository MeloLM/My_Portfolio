import { React } from "react";
import '../App.css';
import "../style/Hero.css";


export default function Hero() {
  return (
    <>
      <section className="row hero-box">
      
        <div className="col-12 col-md-8 hero-content">
          <h2>Lorem ipsum dolor sit amet consectetur </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni incidunt id autem consequatur! Voluptatibus ullam, quia eligendi animi</p>
        </div>

        <div className="col-12 col-md-3 hero-img">
          <div>
            <div className="tech-icon">
              <img src="./assets/icon/react.png" alt="icona1" />
            </div>
            <img src="./assets/image/bg_Linkedin.jpg" className="rounded-4" alt="profile" />
          </div>  

          <div className="col-12">
            
            <div className="tech-icon">
              <img src="./assets/icon/github.png" className="rounded-5" alt="icona2" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/php.png" className="rounded-5" alt="icona3" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/phyton.png" className="rounded-5" alt="icona4" />
            </div>

          </div>

        </div>

      </section>

    </>
  );
}
