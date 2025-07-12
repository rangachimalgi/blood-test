import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Importing social media icons
import logo from "../../Images/logoReal.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div>
            <h2 className="footer-newsletter-title">Join Fortune Blood Test</h2>
            <p className="footer-newsletter-desc">
              Book Your Packages and Tests now !!!
            </p>
          </div>
          <form
            className="footer-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="footer-newsletter-input"
            />
            <button className="footer-newsletter-btn" type="submit">
              Enquire
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider">
        <div className="footer-divider-inner">
          <div className="footer-divider-line"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-main-inner">
          {/* Company */}
          <div className="footer-col">
            <h3 className="footer-col-title">Company</h3>
            <div className="footer-links">
              <a href="/about" className="footer-link">
                About Us
              </a>
              <a href="/blog" className="footer-link">
                Blog
              </a>
              <a href="/services" className="footer-link">
                Services
              </a>
              <a href="/faqs" className="footer-link">
                FAQs
              </a>
              <a href="/terms" className="footer-link">
                Terms
              </a>
              <a href="/contact" className="footer-link">
                Contact Us
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="footer-col">
            <h3 className="footer-col-title">Address</h3>
            <div className="footer-links">
              <span className="footer-link" style={{ cursor: "default" }}>
               Fortune home health care .683,17th cross 26th Main Puttenahalli road jp nagar 6th phase 560076
              </span>
              {/* <a href="mailto:demo@gmail.com" className="footer-link">
                demo@gmail.com
              </a> */}
              <a href="tel:+919611011266" className="footer-link">
                +91 98442 11811
              </a>
            </div>
          </div>

          {/* Mobile App & Social */}
          {/* <div className="footer-col">
            <h3 className="footer-col-title">Connect Us</h3>
            <div className="footer-social">
              <img src="/images/img_item_link.svg" alt="Social Link" className="footer-social-icon" />
              <img src="/images/img_item_link_white_a700.svg" alt="Social Link" className="footer-social-icon" />
              <img src="/images/img_item_link_white_a700_40x40.svg" alt="Social Link" className="footer-social-icon" />
              <img src="/images/img_item_link_40x40.svg" alt="Social Link" className="footer-social-icon" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-bottom-text">
            © 2024 Fortune Blood Test. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="/terms-conditions" className="footer-link">
              Terms & Conditions
            </a>
            <div className="footer-bottom-dot"></div>
            <a href="/privacy" className="footer-link">
              Privacy Notice
            </a>
            {/* <button className="footer-bottom-btn">
              <img src="/images/img_link.svg" alt="Link" />
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
