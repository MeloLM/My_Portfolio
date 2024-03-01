import { React } from "react";
import '../App.css';
import '../ContactMe.css';
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";

export default function Contact () {


  return (
    <>
      
      <div className="container contact-box">
        <h4>Contact Me</h4>

        <div className="row contact-content">
          <div className="col-12 col-md-6" style={{flex: 1 }}>
            <ContactCard 
              iconUrl="./assets/icon/php.png"
              text="melo123@email.com"
            />
            <ContactCard 
              iconUrl="./assets/icon/github.png"
              text="https://github.com/MeloLM"
            />
          </div>

          <div className="col-12 col-md-6" style={{flex: 1 }}>
            <ContactForm />
          </div>
        </div>
      </div>

    </>
  );
}
