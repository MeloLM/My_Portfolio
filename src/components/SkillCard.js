import '../App.css';
import '../style/SkillCard.css';



export default function SkillCard({title, iconUrl, isActive, onClick}) {


  return (
    <>
      
      <div className={`skill-card ${isActive ? "active" : ""}`} onClick={() => onClick()}>
        <div className="skill-icon">
          <img src={iconUrl} alt={title} />
        </div>
        
        <span>{title}</span>
      </div>

    </>
  );
}
