import '../App.css';
import '../style/MobileNav.css'

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
              <button className="contact_btn">Hire Me</button>
            </a>
          </ul>

        </div>
      
      </div>
      
    </>
  );
}
