import { useState } from "react";
import '../App.css';
import '../style/ContactForm.css';

export default function ContactForm () {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const phoneNumber = "393510845851";
    const text = `Ciao! Sono ${formData.name}.%0A%0A${formData.message}`;
    const WAURL = `https://wa.me/${phoneNumber}?text=${text}`;
    
    window.open(WAURL, '_blank');
  };

  return (
    <>
      
      <div className="contact-form">
        <form onSubmit={sendMessage}>
          <div className="form-group">
            <input 
              type="text"
              name="name"
              placeholder="Il tuo nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <textarea 
              name="message"
              placeholder="Scrivi il tuo messaggio..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Invia su WhatsApp</button>
        </form>
      </div>

    </>
  );
}
