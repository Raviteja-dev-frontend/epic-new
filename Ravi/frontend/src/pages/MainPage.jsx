import React, { useRef, useContext } from 'react';
import './MainPage.css';
import Slider from "./Slider.jsx";
import { assets } from "../assets/assets.js";
import TypingEffect from './TypingEffect.jsx';
import LatestCollection from "../components/LatestCollection.jsx"
import ParallaxBanner from './ParallaxBanner.jsx';
import CatagereCards from './CatagereCards.jsx';
import ADD_Video from '../assets/ADD_Video.mp4';
import ProductSnicks from "./ProductSnicks.jsx";
import BestSeller from "../components/BestSeller.jsx"
import FAQ_Section from './FAQ_Section.jsx';
import Slider_Comments from "./Slider_Comments.jsx"
function MainPage() {
  return (
    <div className="main-page">
      <div class="gold-divider"></div>
      <div className='Screen-2_slideing'>
        <Slider />
      </div>
      <div className="screen-add_forer">
        <div className="screen-add_forer-title">
          <h2>Why Choose epic moments Gifts?</h2>
          <p>We bring joy to your special moments with creative, custom-made gifts and exceptional service.</p>
        </div>

        {[
          {
            image: assets.present_1,
            title: "Unique Custom Gifts",
            desc: "Give your loved ones something truly special – fully personalized gifts made with heart and creativity.",
          },
          {
            image: assets.present_2,
            title: "Fast & Reliable Delivery",
            desc: "We ensure your customized gifts reach you quickly and safely, right when you need them.",
          },
          {
            image: assets.present_3,
            title: "Wide Range of Options",
            desc: "Explore a vast collection of gift items – from photo frames to mugs, cushions, and more, for every occasion.",
          },
        ].map((item, index) => (
          <div className="dignity-block" key={index}>
            <div className="dignity-image">
              <img src={item.image} alt={item.title} />
            </div>
            <h3 className="h3_title">{item.title}</h3>
            <div className="dignity-description">
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <TypingEffect />
      <div className='Latest_div'>
        <LatestCollection />
      </div>
      <div>
        <ParallaxBanner />
      </div>
      <div className='screen-6'>
        <CatagereCards />
      </div>

      <div className='screen-5'>
        <div className='my_add'>
          <video
            src={ADD_Video}
            autoPlay
            loop
            muted
            playsInline
            className="cover-video"
            poster="/fallback-image.jpg"
          />
        </div>
        <div className="founder-section">
          <h2 className="founder-title">Meet The Founder</h2>
          <div className="founder-content">
            <h3 className="founder-name">Anosh</h3>
            <p className="founder-description">
              Mr. Anosh is the visionary founder and CEO of <strong>Epic Moments</strong>,
              a premium <strong>customized photo gifts</strong> brand.
            </p>
            <p className="founder-mission">
              Under his leadership, <strong>Epic Moments</strong> has transformed from a passionate idea
              into a trusted name in the personalized gifting industry.
            </p>
          </div>
        </div>
      </div>

      <ProductSnicks />
      <div className='Dairy_milk'>
        <div className="Dairy_mater">
          <div className="shop-banner">
            <h2 className="shop-title"><p>Discover<br /> Special Gifts at </p><span>Epic Moments</span></h2>
            <a href="/collection" className="shop-now-btn">SHOP NOW</a>
          </div>
        </div>
        <div className='Dairy_image'>
          <img src={assets.Special_2} alt="Special" />
        </div>
      </div>

      <div className='bg-pattern'>
        <BestSeller />
      </div>

      <div className='Slide-8'>
        <FAQ_Section />
        {/* <div className='Slide_comments_main'>
          <div className='Comments_Persons_1'>
            <img className='gust_1' src={assets.elesha} alt='Profile 1' />
            <img className='gust_2' src={assets.its_me} alt='Profile 2' />
            <img className='gust_3' src={assets.siddu} alt='Profile 3' />
          </div>

          <div className='Comments_box'>
            <Slider_Comments />
          </div>

          <div className='Comments_Persons_2'>
            <img className='gust_4' src={assets.rahul} alt='Profile 4' />
            <img className='gust_5 ' src={assets.niranjan} alt='Profile 5' />
            <img className='gust_6' src={assets.suresh} alt='Profile 6' />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default MainPage;
