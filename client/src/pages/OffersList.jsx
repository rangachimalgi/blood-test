import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContainer } from "../App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "../components/CheckoutForm";
import Highlight from "../components/Highlight";
import "../Styles/HealthPackageList.css";
import logo from "../Images/logo.png";
import defaultPackageImage from "../Images/GenaralHealthPackage.jpg";

// Array of images to cycle through (including the default image)
const packageImages = [
  "/Images/GenaralHealthPackage.jpg", // Default image
  "/Images/bloodtestone.jpg",
  "/Images/bloodtesttwo.jpg",
  "/Images/bloodtestthree.jpg",
  "/Images/bloodtestfour.jpg",
  "/Images/bloodtestfive.jpg",
  "/Images/bloodtestsix.jpg",
  "/Images/bloodtestseven.jpg",
  "/Images/bloodtesteight.jpg",
  "/Images/bloodtestnine.jpg"
];

const OffersList = () => {
  const { addToCart, cachedPackages, packagesLoading, fetchPackages } = useContext(DataContainer);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      // Use cached data or fetch if not available
      if (cachedPackages.length > 0) {
        setAllPackages(cachedPackages);
        setLoading(false);
      } else {
        if (!packagesLoading) {
          setLoading(true);
        }
        const data = await fetchPackages();
        setAllPackages(data);
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Separate effect to update packages when cache changes
  useEffect(() => {
    if (cachedPackages.length > 0 && allPackages.length === 0) {
      setAllPackages(cachedPackages);
      setLoading(false);
    }
  }, [cachedPackages, allPackages.length]);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowCheckout(true);
    navigate(`/health/${pkg.id}`);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  // Filter packages by category === "Offer"
  const displayedPackages = allPackages.filter((pkg) => pkg.category === "Offer");

  // Calculate total number of tests from includedTests array
  const extractNumberOfTests = (pkg) => {
    // If package has includedTests, sum all tests from all categories
    if (pkg.includedTests && pkg.includedTests.length > 0) {
      const totalTests = pkg.includedTests.reduce((sum, category) => {
        return sum + (category.tests?.length || 0);
      }, 0);
      return totalTests > 0 ? totalTests.toString() : "";
    }
    // Fallback: try to extract from productName if includedTests not available
    const match = pkg.productName?.match(/(\d+)\s*Tests/i);
    return match ? match[1] : "";
  };

  if (loading) {
    return (
      <div className="packages-list packages-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem' }}>Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="packages-list packages-page">
      <ToastContainer />
      <div className="section-header" style={{ 
        textAlign: "center", 
        marginBottom: "3rem",
        padding: "0 1rem"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#dc2626",
          marginBottom: "1rem",
          textTransform: "none"
        }}>
          Special Offers
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          Discover our exclusive health package offers with great discounts
        </p>
      </div>

      {displayedPackages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No offers available at the moment.</p>
        </div>
      ) : (
        <div className="packages-grid">
          {displayedPackages.map((pkg, index) => {
            // Cycle through the image array for all packages
            const imageIndex = index % packageImages.length;
            const imageSrc = packageImages[imageIndex];
            
            return (
              <div key={pkg.id} className="package-card">
                <Highlight number={extractNumberOfTests(pkg)} />
                <div className="package-image-container">
                  <Link to={`/health/${pkg.id}`} className="package-link">
                    <img
                      src={imageSrc}
                      alt={pkg.productName}
                      className="package-image"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = defaultPackageImage;
                      }}
                    />
                  </Link>

                  {/* Move this OUTSIDE the Link */}
                  <div className="hover-overlay">
                    <h2>{pkg.overlayTitle?.toUpperCase() || pkg.productName?.toUpperCase()}</h2>
                    <ul>
                      {pkg.overlayDetails?.map((detail, index) => (
                        <li key={index}>{detail.toUpperCase()}</li>
                      )) || 
                      (pkg.includedTests?.map(category => (
                        <li key={category.categoryName}>
                          {`${category.categoryName.split('(')[0]} (${category.tests.length})`}
                        </li>
                      )))}
                    </ul>
                  </div>
                </div>

                <Link to={`/health/${pkg.id}`} className="package-link">
                  <div className="package-details">
                    <div className="package-name">
                      {pkg.productName.toUpperCase()}
                    </div>
                    {/* <div className="package-desc">
                      {pkg.desc ? pkg.desc.toUpperCase() : ""}
                    </div> */}
                  </div>
                </Link>

                <div className="price-cart-box">
                  <div className="price-box">
                    <span className="mrp">&#8377;{pkg.mrp}</span>
                    <span className="discounted-price">&#8377;{pkg.price}</span>
                  </div>
                  <button
                    className="book-now-button"
                    onClick={() => handleBookNow(pkg)}
                    aria-label={`Book ${pkg.productName} now`}
                  >
                    Book Now
                  </button>
                </div>

                <div className="extra-details-with-logo">
                  <div className="logo-container">
                    <img src={logo} alt="Fortune Blood Test Logo" className="package-logo" />
                  </div>
                  <div className="extra-details">
                    <ul>
                      <li>
                        <i className="fa fa-check-circle" aria-hidden="true"></i> NABL, CAP, ISO 9001
                      </li>
                      <li>
                        <i className="fa fa-check-circle" aria-hidden="true"></i> Free Home Sample
                        Pickup
                      </li>
                      <li>
                        <i className="fa fa-check-circle" aria-hidden="true"></i> Online Report
                        Delivery
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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

export default OffersList;

