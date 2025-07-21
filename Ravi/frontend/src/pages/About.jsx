import React from "react";
import "./About.css";
import { motion } from "framer-motion";
import { FaMagic, FaGem, FaClock, FaSmile } from "react-icons/fa";

const About = () => {
  return (
    <section className="epic-about">
      {/* Hero Section */}
      <motion.div
        className="epic-about__hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="epic-about__hero-text">
          <h1>
            Welcome to <span className="epic-about__highlight">EPIC MOMENTS</span>
          </h1>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="epic-about__features">
        <div className="epic_about_text">
          <h1>About</h1>
          <p>
            EpicMoments is a premium brand dedicated to turning your memories into beautifully personalized gifts. We specialize in high-quality, handcrafted products like LED photo lamps, custom photo frames, sublimation pillows, and waterproof photo stickers — all designed to capture and celebrate life’s most special moments.
            <br /><br />
            Each product is carefully made using top-grade materials such as 5mm MDF wood, glossy laminated prints, and vibrant sublimation fabrics, ensuring durability and rich visual appeal. Whether it’s a birthday, anniversary, wedding, or a thoughtful surprise, our creations are tailored to make every occasion truly memorable.
            <br /><br />
            At EpicMoments, we believe that gifts should be as unique as the people receiving them. That’s why we offer full customization — add your photos, names, dates, or messages to create something truly one-of-a-kind. Our wide range includes rotating lamps, mirror lamps, heart-shaped pillows, and more.
            <br /><br />
            With a commitment to quality, creativity, and fast delivery, EpicMoments is your trusted destination for meaningful personalized gifts. We also welcome resellers and students to join our growing brand through exciting partnership opportunities.
            <br /><br />
            Create. Personalize. Celebrate. Only with Epic Moments.
          </p>
        </div>

        <div className="card-fuctures">
          <motion.div
            className="card-fuctures_item item--1"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
          >
            <FaMagic className="card-icon-1" />
            <span className="card-fuctures_quantity">Creative Designs</span>
            <span className="card-fuctures_text text--1">We blend emotion and artistry to craft magical gifts.</span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--2"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaGem className="card-icon-2"/>
            <span className="card-fuctures_quantity">Premium Quality</span>
            <span className="card-fuctures_text text--2">Every product is built with top-notch materials.</span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--3"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FaClock className="card-icon-3"/>
            <span className="card-fuctures_quantity">Timely Delivery</span>
            <span className="card-fuctures_text text--3">Fast shipping to make every celebration perfect.</span>
          </motion.div>

          <motion.div
            className="card-fuctures_item item--4"
            whileHover={{ scale: 1.05, rotate: 360 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <FaSmile className="card-icon-4"/>
            <span className="card-fuctures_quantity">Customer First</span>
            <span className="card-fuctures_text text--4">Your happiness is our priority and promise.</span>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default About;
