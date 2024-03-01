import { React } from "react";
import '../App.css';
import '../style/ContactCard.css';

export default function ContactCard ({iconUrl, text}) {


  return (
    <>
      
      <div className="contact-card">
        <div className="icon">
          <img src={iconUrl} alt={text} />
        </div>

        <p>{text}</p>
      </div>

    </>
  );
}
