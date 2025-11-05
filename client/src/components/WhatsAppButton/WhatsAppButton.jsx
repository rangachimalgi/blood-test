import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  // WhatsApp number from footer: +91 98442 11811
  // Format: https://wa.me/919844211811 (country code + number without + or spaces)
  const whatsappNumber = "919844211811";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="whatsapp-button-container">
      <button
        className="whatsapp-button"
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </button>
    </div>
  );
};

export default WhatsAppButton;

