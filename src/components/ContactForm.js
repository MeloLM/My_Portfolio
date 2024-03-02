import { React } from "react";
import '../App.css';
import '../style/ContactForm.css';

export default function ContactForm () {


  return (
    <>
      
      <div className="contact-form">
        <form action="">
          <div className="name-box">
            <input type="text" name="firstname" placeholder="First Name" />
            <input type="text" name="lastname" placeholder="Last Name" />
          </div>
          <input type="email" name="email" placeholder="Email address" />
          <textarea type="text" name="message" placeholder="Message" rows={3} />
          
          <button type="submit">Send</button>
        </form>
      </div>

    </>
  );
}
