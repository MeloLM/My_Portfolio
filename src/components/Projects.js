import '../App.css';
import '../style/Projects.css';
import { PROJECTS } from "../utils/data";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <>
      <section className="container projects-box" id="projects">
        <h5>I Miei Progetti</h5>
        <p className="projects-subtitle">Alcuni dei lavori che ho realizzato</p>

        <div className="row projects-content">
          {PROJECTS.map((project, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
