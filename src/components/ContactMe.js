import '../App.css';
import '../style/ContactMe.css';
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";

export default function Contact () {


  return (
    <>
      
      <div className="container contact-box" id="contact">
        <h4>Contact Me</h4>

        <div className="row contact-content">
          <div className="col-12 col-md-6" style={{flex: 1 }}>
            <ContactCard 
              iconUrl="./assets/icon/gmail_icon.png"
              text="Send me a email"
              linkText="mailto:carmelo.la.mantia00@gmail.com"
            />
            <ContactCard 
              iconUrl="./assets/icon/github.png"
              text="@MeloLM - gitHub"
              linkText="https://github.com/MeloLM"
            />
          </div>

          <div className="col-12 col-md-6" style={{flex: 1 }}>
            <ContactCard 
              iconUrl="./assets/icon/WA_icon.png"
              text="Write me a message here"
            />
            <ContactForm />
          </div>
        </div>
      </div>

    </>
  );
}
