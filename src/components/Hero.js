import '../App.css';
import "../style/Hero.css";


export default function Hero() {
  return (
    <>
      <section className="row hero-box" aria-label="Introduzione">
      
        <div className="col-12 col-md-8 hero-content">
          <h2 className="mx-5 px-3">Welcome</h2>
          <p>I am a young full stack developer with experience in the world of websites and a particular passion for the server side. I took an intensive course where I learned as much about the front end as the back end, thanks to a practical object-based approach. I also understood how the Agile Scrum method works during various exercises. In addition to knowing how to code, I have also developed good communication, stress management and problem-solving skills.</p>
        </div>

        <div className="col-12 col-md-3 hero-img">
          <div>
            <div className="tech-icon">
              <img src="./assets/icon/react.png" alt="React.js technology icon" loading="lazy" />
            </div>
            <img src="./assets/image/profile.jpg" className="rounded-4" alt="Carmelo La Mantia - Full Stack Developer" loading="lazy" />
          </div>  

          <div className="col-12">
            
            <div className="tech-icon">
              <img src="./assets/icon/github.png" className="rounded-5" alt="GitHub version control icon" loading="lazy" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/php.png" className="rounded-5" alt="PHP programming language icon" loading="lazy" />
            </div>
            
            <div className="tech-icon">
              <img src="./assets/icon/lara.webp" className="rounded-3" alt="Laravel framework icon" loading="lazy" />
            </div>

          </div>

        </div>

      </section>

    </>
  );
}
