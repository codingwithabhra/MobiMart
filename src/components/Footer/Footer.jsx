import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <div>
      <div
        className="text-center footer"
        style={{ backgroundColor: "#7c3aed", color: "#fff" }}
      >
        <div className="container">
          <p className="footer-text py-3 mb-0">
            &copy; 2026 All rights reserved | ABHRA PATRA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
