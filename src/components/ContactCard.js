import '../App.css';
import '../style/ContactCard.css';

export default function ContactCard ({iconUrl, text, linkText}) {


  return (
    <>
      
      <div className="contact-card">
        <div className="icon">
          <img src={iconUrl} alt="" className="rounded-3 w-100" loading="lazy" aria-hidden="true" />
        </div>

        <a href={linkText} target="_blank" rel="noopener noreferrer" aria-label={text}>{text}</a>
      </div>

    </>
  );
}
