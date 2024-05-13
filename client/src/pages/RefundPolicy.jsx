import React from "react";
import "../Styles/TermsAndConditions.css";

const RefundPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Refund Policy</h1>
      <p className="terms-text">Conditions</p>
      <p className="terms-text">
        1) Payment will be refunded within 3 working days
      </p>
      <p className="terms-text">
        2) Payment will be refunded with same payment method made by customer
      </p>
      <p className="terms-text">
        3) Refund of payment only will be applicable if refund application is
        done within 24hrs of Payment{" "}
      </p>
    </div>
  );
};

export default RefundPolicy;
