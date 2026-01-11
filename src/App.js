import './App.css';
import Vnavbar from './components/Vnavbar';
import Hero from "./components/Hero";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import WorkExp from "./components/WorkExp";
import Contact from "./components/ContactMe";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      
      <Vnavbar />
      
      <div className="container">
        <Hero />
      </div>

      <div className="container">
        <Skill />
      </div>

      <div className="container">
        <Projects />
      </div>
      
      <div className="container">
        <WorkExp />
      </div>

      <div className="container">
        <Contact />
      </div>

      <Footer />

    </>
  );
}
