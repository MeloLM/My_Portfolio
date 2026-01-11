import '../App.css';
import '../style/MobileNav.css'

export default function MobileNav({isOpen, toggleMenu}) {
  return (
    <>
       
      <div 
        className={`mobile-menu ${isOpen ? "active": ""}`} 
        onClick={toggleMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione mobile"
      >

        <nav className="mobile-box" aria-label="Navigazione principale">
          <h1>Carmelo La Mantia</h1>
          <img className='logo_1' src='./assets/icon/laravel.jpg' alt="Logo Laravel" loading="lazy" />

          <ul role="menu">
            <li role="menuitem">
              <a className="menu-item" href="/">Home</a>
            </li>

            <li role="menuitem">
              <a className="menu-item" href="#skills">Skill</a>
            </li>

            <li role="menuitem">
              <a className="menu-item" href="#projects">Projects</a>
            </li>

            <li role="menuitem">
              <a className="menu-item" href="#work-exp">Experience</a>
            </li>

            <li role="menuitem">
              <a className="menu-item" href="#contact">Contact</a>
            </li>

            <a className="text-decoration-none" href="./CV_Carmelo_la_mantia_2026.pdf" download="CV_Carmelo_La_Mantia.pdf" aria-label="Scarica il mio CV in PDF">
              <button className="contact_btn">Hire Me</button>
            </a>
          </ul>

        </nav>
      
      </div>
      
    </>
  );
}
