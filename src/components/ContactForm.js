import { React, useRef, useState } from "react";
import '../App.css';
import '../style/ContactForm.css';
import emailjs from '@emailjs/browser';

export default function ContactForm () {
  const form = useRef();
  const [firstName, setFirstname]= useState('');
  const [lastName, setLastname]= useState('');
  const [emailAddress, setEmail]= useState('');
  const [message, setMessage]= useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = 'service_gt2uoev';
    const templateID = 'template_y3l0bmk';

  emailjs.sendForm(serviceID, templateID, form.current, {
        publicKey: 'kforPiP9Kqq8o2cYk',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setFirstname('');
          setLastname('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
      
      <div className="contact-form">
        <form action="POST" ref={form} onSubmit={sendEmail}>
          <div className="name-box">
            <input type="text" value={firstName} name="firstname" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)}/>
            <input type="text" value={lastName} name="lastname" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)}/>
          </div>
          <input type="email" value={emailAddress} name="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
          <textarea type="text" value={message} name="message" placeholder="Message" rows={3} onChange={(e) => setMessage(e.target.value)}/>
          
          <button type="submit">Send</button>
        </form>
      </div>

    </>
  );
}
