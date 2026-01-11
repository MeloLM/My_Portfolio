import '../App.css';
import '../style/ExpCard.css';

export default function ExpCard({ details }) {
  return (
    <article className="exp-card">
      <h5>{details.title}</h5>
      
      {details.company && (
        <div className="exp-company">{details.company}</div>
      )}
      
      {details.location && (
        <div className="exp-location">{details.location}</div>
      )}

      <div className="exp-duration">{details.date}</div>

      <ul>
        {details.respons.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
