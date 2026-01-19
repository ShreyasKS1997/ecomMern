import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h3>Download our App</h3>
        <p>Download App for Android and IOS mobile phone</p>
        <div>
          <img src='/google-play-store-icon.png' alt="Playstore" />
          <img src='/App_Store_(iOS)-Logo.wine.png' alt="AppStore" />
        </div>
      </div>

      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights {new Date().getFullYear()} &copy; ECOMMERCE</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <div className="socialIcons">
          <img src='/Youtube_Icon.png' alt="Facebook" />
          <img src='/facebook-logo.png' alt="Facebook" />
          <img src='/instagram-icon.png' alt="Instagram" />
          <img src='/x-icon.png' alt="Twitter" />
          <img src="/linkedIn-logo.png" alt="LinkedIn"/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
