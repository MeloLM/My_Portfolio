import '../App.css';
import '../style/ExpCard.css';

export default function ExpCard ({details}) {
  return (
    <>
      
      <div className="exp-card">
        <h5>{details.title}</h5>

        <div className="exp-duration">{details.date}</div>

        <ul>
          {details.respons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

    </>
  );
}
