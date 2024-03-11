import { React, useState } from "react";
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
          <img className='logo_1 rounded-5 mx-1' src='./assets/icon/laravel.jpg' alt="logo" />

          <ul>
            <li>
              <a className="menu-item" href="/">Home</a>
            </li>

            <li>
              <a className="menu-item" href="#skills">Skill</a>
            </li>

            <li>
              <a className="menu-item" href="#work-exp">Experience</a>
            </li>

            <li>
              <a className="menu-item" href="#contact">Contact</a>
            </li>

            <button className="contact_btn" onClick={() => {}}>Hire Me</button>
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