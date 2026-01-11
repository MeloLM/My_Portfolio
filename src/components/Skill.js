import { useState } from "react";
import '../App.css';
import '../style/Skill.css';
import { SKILLS } from "../utils/data";
import SkillCard from "./SkillCard";
import SkillInfo from "./SkillInfo";


export default function Skill() {
  const [selectedSkill, setSelectedSkill] =useState(SKILLS[0]);

  const handleSelectSkill = (data) => {
    setSelectedSkill(data);
  };

  return (
    <>
      
      <section className="container skill-box" id="skills">
        <h5>Technical Proficiency</h5>

        <div className="row skill-content">
        
          <div className="skill col-12 col-md-4">
            {SKILLS.map((item) => (
              <SkillCard 
                key={item.title}
                iconUrl={item.icon}
                title={item.title} 
                isActive={ selectedSkill.title === item.title}
                onClick={ ()=>handleSelectSkill(item) }
              />
            ))}
          </div>

          <div className="skill-info col-12">
            <SkillInfo 
              heading = {selectedSkill.title}
              skills = {selectedSkill.skill} 
            />
          </div>
        
        </div>

      </section>

    </>
  );
}
