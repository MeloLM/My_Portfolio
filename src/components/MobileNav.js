import { React } from "react";
import '../App.css';
import '../MobileNav.css'

export default function MobileNav({isOpen, toggleMenu}) {
  return (
    <>
       
      <div className={`mobile-menu ${isOpen ? "active": ""}`} 
        onClick={toggleMenu} >

        <div className="mobile-box">
          <h1>Carmelo La Mantia</h1>
          <img className='logo_1' src='./assets/icon/laravel.jpg' alt="logo" />

          <ul>
            <li>
              <a className="menu-item" href="">Home</a>
            </li>

            <li>
              <a className="menu-item" href="">Skill</a>
            </li>

            <li>
              <a className="menu-item" href="">Project</a>
            </li>

            <li>
              <a className="menu-item" href="">Contact</a>
            </li>

            <button className="contact_btn" onClick={() => {}}>Hire Me</button>
          </ul>

        </div>
      
      </div>
      
    </>
  );
}
