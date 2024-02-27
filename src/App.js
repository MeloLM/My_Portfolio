import { React } from "react";
import './App.css';
import Vnavbar from './components/Vnavbar';
import Hero from "./components/Hero";
import Skill from "./components/Skill";

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

    </>
  );
}
