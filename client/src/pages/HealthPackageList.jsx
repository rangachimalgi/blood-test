import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { healthPackagesArray } from "./HealthPackages";
import { DataContainer } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "../components/CheckoutForm";
import Highlight from "../components/Highlight";
import "../Styles/HealthPackageList.css";
import logo from "../Images/logo.png";

const HealthPackagesList = ({ packageIds }) => {
  const { addToCart } = useContext(DataContainer);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (pkg) => {
    addToCart(pkg);
    toast.success("Product has been added to cart!");
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowCheckout(true);
    navigate(`/health/${pkg.id}`); // Navigate to the health package page
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  // Filter packages based on the provided packageIds
  const displayedPackages = packageIds
    ? healthPackagesArray.filter((pkg) => packageIds.includes(pkg.id))
    : healthPackagesArray;

  // Extract the number before the word "Tests"
  const extractNumberOfTests = (productName) => {
    const match = productName.match(/(\d+)\s*Tests/i);
    return match ? match[1] : "";
  };

  return (
    <div className="packages-list">
      <ToastContainer />
      <h2>
        {packageIds ? "Selected Health Packages" : "Available Health Packages"}
      </h2>
      <div className="packages-grid">
        {displayedPackages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <Highlight number={extractNumberOfTests(pkg.productName)} />
            <Link to={`/health/${pkg.id}`} className="package-link">
              <div className="package-image-container">
                <img
                  src={pkg.imgUrl}
                  alt={pkg.productName}
                  className="package-image"
                />
                <div className="hover-overlay">
                  <h2>{pkg.overlayTitle.toUpperCase()}</h2>
                  <ul>
                    {pkg.overlayDetails?.map((detail, index) => (
                      <li key={index}>{detail.toUpperCase()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
            <div className="package-details">
              <div className="package-name">
                {pkg.productName.toUpperCase()}
              </div>
              <div className="package-desc">
                {pkg.desc ? pkg.desc.toUpperCase() : ""}
              </div>
            </div>
            <div className="price-cart-box">
              <div className="price-box">
                <span className="mrp">&#8377;{pkg.mrp}</span>
                <span className="discounted-price">&#8377;{pkg.price}</span>
              </div>
            </div>
            <button
              className="book-now-button"
              onClick={() => handleBookNow(pkg)}
            >
              Book Now
            </button>
            <div className="extra-details-with-logo">
              <div className="logo-container">
                <img src={logo} alt="Logo" className="package-logo" />
              </div>
              <div className="extra-details">
                <ul>
                  <li>
                    <i className="fa fa-check-circle"></i> NABL, CAP, ISO 9001
                  </li>
                  <li>
                    <i className="fa fa-check-circle"></i> Free Home Sample
                    Pickup
                  </li>
                  <li>
                    <i className="fa fa-check-circle"></i> Online Report
                    Delivery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCheckout && selectedPackage && (
        <CheckoutForm
          show={showCheckout}
          handleClose={handleCloseCheckout}
          CartItem={selectedPackage ? [selectedPackage] : []}
          setCartItem={() => {}}
        />
      )}
    </div>
  );
};

export default HealthPackagesList;
