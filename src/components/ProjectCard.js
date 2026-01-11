import '../App.css';
import '../style/ProjectCard.css';
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";

export default function ProjectCard({ project }) {
  return (
    <>
      <article className="project-card">
        <div className="project-image">
          <img src={project.image} alt={`Screenshot del progetto ${project.title}`} loading="lazy" />
          <div className="project-overlay">
            <div className="project-links">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Vedi codice sorgente di ${project.title} su GitHub`}
                >
                  <BsGithub />
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Vedi demo live di ${project.title}`}
                >
                  <BsBoxArrowUpRight />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="project-info">
          <h6>{project.title}</h6>
          <p>{project.description}</p>
          
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
