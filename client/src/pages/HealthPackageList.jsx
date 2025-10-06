import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataContainer } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "../components/CheckoutForm";
import Highlight from "../components/Highlight";
import "../Styles/HealthPackageList.css";
import logo from "../Images/logo.png";
import defaultPackageImage from "../Images/GenaralHealthPackage.jpg";

const HealthPackagesList = ({ title, packageIds, useLocalData = false }) => {
  const { addToCart, cachedPackages, packagesLoading, fetchPackages } = useContext(DataContainer);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      console.log('HealthPackageList: Loading packages...', { useLocalData, cachedPackagesLength: cachedPackages.length, packagesLoading });
      
      if (useLocalData) {
        // For home page, use cached data or fetch if not available
        if (cachedPackages.length > 0) {
          console.log('HealthPackageList: Using cached packages for home page');
          setAllPackages(cachedPackages);
          setLoading(false);
        } else {
          if (!packagesLoading) {
            setLoading(true);
          }
          console.log('HealthPackageList: Fetching packages for home page');
          const data = await fetchPackages();
          setAllPackages(data);
          setLoading(false);
        }
      } else {
        // Use cached data or fetch if not available
        if (cachedPackages.length > 0) {
          console.log('HealthPackageList: Using cached packages');
          setAllPackages(cachedPackages);
          setLoading(false);
        } else {
          // Only show loading if we don't have cached data
          if (!packagesLoading) {
            setLoading(true);
          }
          console.log('HealthPackageList: Fetching packages');
          const data = await fetchPackages();
          setAllPackages(data);
          setLoading(false);
        }
      }
    };

    loadPackages();
  }, [useLocalData]); // Removed problematic dependencies that cause re-fetching

  // Separate effect to update packages when cache changes, but don't trigger loading
  useEffect(() => {
    if (cachedPackages.length > 0 && allPackages.length === 0) {
      console.log('HealthPackageList: Updating packages from cache');
      setAllPackages(cachedPackages);
      setLoading(false);
    }
  }, [cachedPackages, allPackages.length]);

  const handleAddToCart = (pkg) => {
    addToCart(pkg);
    // Removed toast notification
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowCheckout(true);
    navigate(`/health/${pkg.id}`);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  // Filter packages based on the provided packageIds
  const displayedPackages = packageIds
    ? allPackages.filter((pkg) => packageIds.includes(pkg.id))
    : allPackages;

  // Extract the number before the word "Tests"
  const extractNumberOfTests = (productName) => {
    const match = productName.match(/(\d+)\s*Tests/i);
    return match ? match[1] : "";
  };

  // Check if this is being used as a standalone page (no packageIds means it's the full packages page)
  // Also check if we're on the health-list route specifically
  const isStandalonePage = !packageIds || window.location.pathname === '/health-list';
  
  if (loading) {
    return (
      <div className={`packages-list ${isStandalonePage ? 'packages-page' : ''}`}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem' }}>Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`packages-list ${isStandalonePage ? 'packages-page' : ''}`} style={{ marginTop: window.innerWidth <= 768 ? '180px' : '140px' }}>
      <ToastContainer />
      <div className="section-header" style={{ 
        textAlign: "center", 
        marginBottom: "3rem",
        padding: "0 1rem"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#f87171",
          marginBottom: "1rem",
          textTransform: "none"
        }}>
          {title ||
            (packageIds
              ? "Selected Health Packages"
              : "Available Health Packages")}
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          Choose from our comprehensive range of diagnostic packages
        </p>
      </div>

      <div className="packages-grid">
        {displayedPackages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <Highlight number={extractNumberOfTests(pkg.productName)} />
            <div className="package-image-container">
              <Link to={`/health/${pkg.id}`} className="package-link">
                <img
                  src={pkg.imgUrl ? `/Images/${pkg.imgUrl}` : defaultPackageImage}
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
                <div className="package-desc">
                  {pkg.desc ? pkg.desc.toUpperCase() : ""}
                </div>
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
              >
                Book Now
              </button>
            </div>

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
