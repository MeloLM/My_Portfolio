import '../App.css';
import '../style/ProjectCard.css';
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";

export default function ProjectCard({ project }) {
  return (
    <>
      <div className="project-card">
        <div className="project-image">
          <img src={project.image} alt={project.title} />
          <div className="project-overlay">
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <BsGithub />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo">
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
      </div>
    </>
  );
}
