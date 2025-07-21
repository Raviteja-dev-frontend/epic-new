import React, { useState, useRef } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      console.log("✅ Email sent:", res.status);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Email failed:", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="contact-container">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Get in Touch with <span className="highlight">EPIC MOMENTS</span>
        </h1>
        <p>
          Have a question? Reach out to us, and let’s create something amazing
          together! 🎨✨
        </p>
      </motion.div>

      <div className="contact-content">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>📞 Contact Details</h2>
          <p className="contact-line">
            <FaInstagram size={20} />
            <a href="https://www.instagram.com/epicmoments007" target="_blank" rel="noopener noreferrer">
              @epicmoments007
            </a>
          </p>
          <p className="contact-line">
            <FaFacebook size={20} style={{ marginRight: "8px" }} />
            <a
              href="https://www.facebook.com/share/1BuBjAUYk6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Epic Moments
            </a>
          </p>
          <p>
            <Mail size={20} />{" "}
            <a href="mailto:epicmoments27@gmail.com">epicmoments27@gmail.com</a>
          </p>
          <p>
            <Phone size={20} />{" "}
            <a href="tel:+917989466939">+91 7989466939</a>
          </p>
          <p>
            <MapPin size={30} /> near Mudu Gullu, Gullapalli, Andhra Pradesh 522309
          </p>
          <button className="map-toggle" onClick={() => setShowMap(!showMap)}>
            {showMap ? "Hide Location" : "View Our Location"}
          </button>
        </motion.div>

        {showMap && (
          <motion.div
            className="contact-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              title="Epic Moments Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.1226798947135!2d80.45301307418995!3d16.15977113837086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a366a00c118d68d%3A0x401dc3177a3de3db!2sGullapalli%2C%20Andhra%20Pradesh%20522309!5e0!3m2!1sen!2sin!4v1720178137386!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        )}
      </div>

      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>💬 Send Us a Message</h2>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
