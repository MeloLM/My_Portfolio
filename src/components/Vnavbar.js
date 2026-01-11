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

      <nav className="nav-wrapper">
        <div className="container-fluid nav-content">
          <h1>Carmelo La Mantia</h1>
          

          <ul>
            <li>
              <a className="menu-item" href="/">Home</a>
            </li>

            <li>
              <a className="menu-item" href="#skills">Skill</a>
            </li>

            <li>
              <a className="menu-item" href="#projects">Projects</a>
            </li>

            <li>
              <a className="menu-item" href="#work-exp">Experience</a>
            </li>

            <li>
              <a className="menu-item" href="#contact">Contact</a>
            </li>

            <a className="text-decoration-none" target="_blank" rel="noreferrer noopener" href="https://docs.google.com/document/d/e/2PACX-1vT4HRmeOmilEDtiuiQHmU_o9lJrp4kDKlx-2VWOBklzRMeq9sN3HVjcDPeIaZNtomYkMOyEPonUkeqN/pub">
              <button className="contact_btn" onClick={() => {}}>Hire Me</button>
            </a>
          </ul>
            
            <button className='menu-btn' onClick={toggleMenu}>
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