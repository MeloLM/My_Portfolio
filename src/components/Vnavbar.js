import { useState } from "react";
import '../App.css';
import MobileNav from "./MobileNav";
import { BsX, BsFilterRight } from "react-icons/bs";

export default function Vnavbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>

      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />

      <nav className="nav-wrapper" aria-label="Navigazione principale">
        <div className="container-fluid nav-content">
          <h1>Carmelo La Mantia</h1>
          

          <ul role="menubar">
            <li role="none">
              <a className="menu-item" href="/" role="menuitem">Home</a>
            </li>

            <li role="none">
              <a className="menu-item" href="#skills" role="menuitem">Skill</a>
            </li>

            <li role="none">
              <a className="menu-item" href="#projects" role="menuitem">Projects</a>
            </li>

            <li role="none">
              <a className="menu-item" href="#work-exp" role="menuitem">Experience</a>
            </li>

            <li role="none">
              <a className="menu-item" href="#contact" role="menuitem">Contact</a>
            </li>

            <a className="text-decoration-none" href="./CV_Carmelo_la_mantia_2026.pdf" download="CV_Carmelo_La_Mantia.pdf" aria-label="Scarica il mio CV in PDF">
              <button className="contact_btn">Hire Me</button>
            </a>
          </ul>
            
            <button 
              className='menu-btn' 
              onClick={toggleMenu}
              aria-label={openMenu ? "Chiudi menu" : "Apri menu"}
              aria-expanded={openMenu}
              aria-controls="mobile-menu"
            >
              <span className={'material-symbols-outlined'}
                style={{fontSize:'1.8rem'}} >
                {openMenu ? <BsX /> : <BsFilterRight />}
              </span>
            </button>
            
        </div>
      </nav>
    </>
  );
} 