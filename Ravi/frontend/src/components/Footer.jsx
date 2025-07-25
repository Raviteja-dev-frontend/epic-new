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
import "./Footer.css";
import { assets } from "../assets/assets.js";

const Footer = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://epic-new-backend.onrender.com/api/category");
      if (res.data.success) {
        setCategoryList(res.data.categories);
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

        {/* Logo + Social */}
        <div className="footer-logo d-flex flex-column align-items-center text-center mx-auto">
          <img src={assets.logo_epicmoments} alt="Epic-footer" className="mb-3" />
          <div className="footer-social d-flex flex-nowrap gap-3 justify-content-center">
            <a href="https://www.facebook.com/share/1BuBjAUYk6/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.instagram.com/epicmoments007" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.youtube.com/@epicmoments0504" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://wa.me/message/6NLUMW665UY7K1" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        {/* About */}
        <div className="footer-section footer_about">
          <h2 className="footer-title">About</h2>
          <p>
            EpicMoments creates premium, personalized gifts like LED lamps, photo frames, and pillows. Crafted from high-quality materials and tailored with your photos and messages, our products turn memories into meaningful keepsakes. Ideal for every occasion — create, personalize, and celebrate with EpicMoments.
          </p>
        </div>

        {/* Services */}
        <div className="footer-section-pages">
          <h3 className="footer-title">Services</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300 flex flex-col gap-2">
            <li>Customized Prints</li>
            <li>Baby Photography</li>
            <li>Wedding Photography</li>
            <li>Aerial Photography</li>
            <li>Net Live Streaming</li>
          </ul>
        </div>

        {/* Pages */}
        <div className="footer-section-pages">
          <h3 className="footer-title">Pages</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300 flex flex-col gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Collections</li>
            <li>Contact</li>
            <li>Login</li>
          </ul>
        </div>

      

        {/* Address */}
        <div className="footer-section footer_products">
          <h3 className="footer-title">Shop Address</h3>
          <div className="footer-address space-y-2 text-sm text-gray-300">
            <p className="flex items-center gap-2"><FaClock /> Mon - Sat: 9:00 AM – 8:00 PM</p>
            <p className="flex items-center gap-2"><Phone size={18} /><a href="tel:+917989466939">+91 79894 66939</a></p>
            <p className="flex items-center gap-2"><Mail size={18} /><a href="mailto:epicmoments27@gmail.com">epicmoments27@gmail.com</a></p>
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>Near Mudu Gullu, Opp. 3 Temples,<br />Gullapalli, Main Road,<br />Andhra Pradesh - 522309</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
     <div className="footer-bottom text-center mt-8 border-t pt-4 text-sm text-gray-400">
  <p>© 2025 Design Dynasty. All rights reserved.</p>
  <p className="mt-1">
    Designed and developed by  
    <span className="text-white font-semibold ml-1">Design Dynasty</span><br />
    Call us at: 
    <a href="tel:+919182183823" className="text-white underline hover:text-gray-200 ml-1">
      +91 9182183823, +91 9652680796
    </a>
  </p>
</div>

    </footer>
  );
};

export default Footer;
