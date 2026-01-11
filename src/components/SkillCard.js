import '../App.css';
import '../style/SkillCard.css';



export default function SkillCard({title, iconUrl, isActive, onClick}) {


  return (
    <>
      
      <div 
        className={`skill-card ${isActive ? "active" : ""}`} 
        onClick={() => onClick()}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        aria-label={`Seleziona categoria ${title}`}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        <div className="skill-icon">
          <img src={iconUrl} alt={`${title} skills icon`} loading="lazy" />
        </div>
        
        <span>{title}</span>
      </div>

    </>
  );
}
