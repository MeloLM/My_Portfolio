import '../App.css';
import '../style/Footer.css';

export default function Footer () {
  const currentYear = new Date().getFullYear();

  return (
    <>
      
      <div className="footer-box">
        <p>© {currentYear} | Developed by <span>Carmelo La Mantia</span></p>
      </div>

    </>
  );
}
