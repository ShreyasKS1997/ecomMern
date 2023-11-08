import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img alt="Playstore" />
        <img alt="AppStore" />
      </div>

      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights "Whatever year you are viewing" &copy; Myself</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
      </div>
    </footer>
  );
}

export default Footer;
