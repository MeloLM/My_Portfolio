import { Fragment } from "react";
import '../App.css';
import '../style/SkillInfo.css';



export default function SkillInfo ({heading, skills}) {


  return (
    <>
      
      <div className="skill-info-card">
        <h4 className="text-start">{heading}</h4>

        <div className="skill-content-info">
          {skills.map((item, i) => (
            <Fragment key={`skill_${i}`}>
              <div className="skill-info">
                <p>{item.skill}</p>
                <p className="percentage">{item.percentage}</p>
              </div>

              <div className="skill-progress-bg">
                <div className="skill-progress" style={{width: item.percentage}} />
              </div>
            </Fragment>
          ))}
        </div>
      </div>

    </>
  );
}
