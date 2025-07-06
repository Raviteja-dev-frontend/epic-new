import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import "./Footer.css";
import { assets } from "../assets/assets.js";

const Footer = () => {
  const [showMap, setShowMap] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category");
      if (res.data.success) {
        setCategoryList(res.data.categories); // assuming categories = [{ _id, name }]
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer className="footer text-white">
      <div className="footer-container d-flex flex-wrap justify-content-around gap-2">

  <div className="footer-logo d-flex flex-column align-items-center flex-nowrap text-center mx-auto">
  <img src={assets.logo_epicmoments} alt="Epic-footer" className="mb-3" />

  <div className="footer-social d-flex flex-nowrap gap-3 justify-content-center">
    {/* Facebook */}
    <a
      href="https://www.facebook.com/share/1BuBjAUYk6/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="social-icon"
    >
      <FaFacebook />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/epicmoments007"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="social-icon"
    >
      <FaInstagram />
    </a>

    {/* YouTube */}
    <a
      href="https://www.youtube.com/@epicmoments0504"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="social-icon"
    >
      <FaYoutube />
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/message/6NLUMW665UY7K1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="social-icon"
    >
      <FaWhatsapp />
    </a>
  </div>
</div>



        {/* About Section */}
        <div className="footer-section footer_about">
          <h2 className="footer-title ">About</h2>
         <p>
  EpicMoments creates premium, personalized gifts like LED lamps, photo frames, and pillows. Crafted from high-quality materials and tailored with your photos and messages, our products turn memories into meaningful keepsakes. Ideal for every occasion — create, personalize, and celebrate with EpicMoments.
</p>
        </div>

        {/* Static Services Section */}
        <div className="footer-section-1 mx-1">
          <h3 className="footer-title">Services</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300 flex flex-col gap-2">
            <li>Customized Prints</li>
            <li>Baby Photography</li>
            <li>Wedding Photography</li>
            <li>Aerial Photography</li>
            <li>Net Live Streaming</li>
          </ul>
        </div>

        {/* Dynamic Category List as Products */}
<div className="footer-section  footer_products">
  <h3 className="footer-title">Our Products</h3>

<div className="flex flex-row gap-5 footer_products-1 pl-5">

    {Array.from({ length: 2 }).map((_, columnIndex) => (
      <div key={columnIndex} className="flex flex-col gap-2">
        {categoryList
          .slice(0, 14) // ✅ Limit to 10 total items
          .slice(columnIndex * 7, columnIndex * 7 + 7) // 5 per column
          .map((cat) => (
            <div key={cat._id} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-white">➤</span>
              <span>{cat.name}</span>
            </div>
          ))}
      </div>
    ))}
  </div>
</div>









        {/* Address + Contact */}
        <div className="footer-section footer_products">
          <h3 className="footer-title">Shop Address</h3>
          <div className="footer-address space-y-2 text-sm text-gray-300  footer_products">

            <p className="flex items-center gap-2">
              <FaClock /> Mon - Sat: 9:00 AM – 8:00 PM
            </p>

            <p className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:+917989466939" className="hover:underline">
                +91 79894 66939
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:epicmoments27@gmail.com" className="hover:underline">
                epicmoments27@gmail.com
              </a>
            </p>

           <p className="flex items-start gap-2">
  <FaMapMarkerAlt className="mt-1" />
  <span style={{ textAlign: 'left' }}>
    Near Mudu Gullu, Opp. 3 Temples,<br />
    Gullapalli, Main Road,<br />
    Andhra Pradesh - 522309
  </span>
</p>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="bg-white text-black px-3 py-1 rounded-sm text-xs hover:bg-gray-200 transition"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Location" : "View Our Location"}
              </button>
            </motion.div> */}

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom text-center mt-8 border-t pt-4 text-sm text-gray-400">
  <p>© 2025 Design Dynasty. All rights reserved.</p>
  <p className="mt-1">
    Crafted with ❤️ by <span className="text-white font-medium">Design Dynasty</span> — Your Partner for Personalized Websites.
    <br />
    Call us at: <a href="tel:+919182183823" className="text-white underline hover:text-gray-200">+91 9182183823</a>
  </p>
</div>

    </footer>
  );
};

export default Footer;
