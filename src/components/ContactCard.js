import '../App.css';
import '../style/ContactCard.css';

export default function ContactCard ({iconUrl, text, linkText}) {


  return (
    <>
      
      <div className="contact-card">
        <div className="icon">
          <img src={iconUrl} alt={text} className="rounded-3 w-100"/>
        </div>

        <a href={linkText} target="_blank" rel="noopener noreferrer">{text}</a>
      </div>

    </>
  );
}
