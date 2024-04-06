import { React, useRef } from "react";
import '../App.css';
import '../style/ContactForm.css';

export default function ContactForm () {
  const form = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    const WAURL =`https://web.whatsapp.com/send/?phone=%2B393510845851`; 

    window.open(WAURL, '_blank');
  };

  return (
    <>
      
      <div className="contact-form">
        <form action="POST" ref={form} onSubmit={sendMessage}>

          <button type="submit" target="_blank">Send</button>
        </form>
      </div>

    </>
  );
}
