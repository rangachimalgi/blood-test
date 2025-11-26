import { useContext, useEffect, useState, useRef } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "./navbar.css";
import { DataContainer } from "../../App";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../LoginModal";
import ProductSearchBar from "../SeachBar/SearchBarGlobal";
import logo from "../../Images/FortuneLogo.png";
import thyrocareLogo from "../../Images/ThyrocareLogo.png";

const NavBar = () => {
  const { CartItem, setCartItem } = useContext(DataContainer);
  const [isFixed, setIsFixed] = useState(false);
  const collapseRef = useRef(null);
  
  // Function to close mobile menu when a link is clicked
  const closeMobileMenu = (e) => {
    if (window.innerWidth <= 767) {
      // Use both requestAnimationFrame and setTimeout to ensure reliable execution
      requestAnimationFrame(() => {
        setTimeout(() => {
          const toggleButton = document.querySelector('[aria-controls="basic-navbar-nav"]');
          const collapseElement = document.getElementById('basic-navbar-nav');
          
          if (toggleButton && collapseElement) {
            // Check if collapse is visible using multiple methods
            const computedStyle = window.getComputedStyle(collapseElement);
            const isVisible = collapseElement.classList.contains('show') || 
                             collapseElement.classList.contains('collapsing') ||
                             (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden');
            
            if (isVisible) {
              // Force close by clicking toggle - this should work every time
              toggleButton.click();
            }
          }
        }, 50);
      });
    }
  };
  // Initialize state from localStorage immediately
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(() => {
    const role = localStorage.getItem("role");
    return role ? role.trim() : null;
  });
  const { setGlobalFilterList } = useContext(DataContainer);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  
  useEffect(() => {
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem("cartItem");
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      setIsLoggedIn(!!token);

      if (role) {
        setUserRole(role.trim());
      } else {
        setUserRole(null);
      }
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (e.g., from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "role") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        className={`navbar navbar-top ${isFixed ? "fixed" : ""} ${isHomePage ? "home-page" : "other-page"}`}
      >
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Fortune Blood Test Logo"
              className="fortune-logo"
            />
            <div className="thyrocare-container">
              <span className="association-text">In association with</span>
              <img
                src={thyrocareLogo}
                alt="Thyrocare Logo"
                className="thyrocare-logo"
              />
            </div>
          </Navbar.Brand>
          {/* Media cart and toggle */}
          <div className="d-flex">
            <div className="media-cart">
              <button
                aria-label="User Account"
                className="nav-icon-button mobile-hide-signup"
                onClick={() =>
                  !isLoggedIn ? setShowLoginModal(true) : setIsLoggedIn(false)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={CartItem.length}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                  aria-hidden="true"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              aria-label="Toggle navigation menu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Navbar.Toggle>
          </div>
          <ProductSearchBar setFilterList={setGlobalFilterList} />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse mobile-only-menu" ref={collapseRef}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  eventKey="home"
                  className="navbar-link"
                  onClick={closeMobileMenu}
                >
                  <span className="nav-link-label">Home</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/shop"
                  eventKey="shop"
                  className="navbar-link"
                  onClick={closeMobileMenu}
                >
                  <span className="nav-link-label">Book a Test</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/health-list"
                  eventKey="health-list"
                  className="navbar-link"
                  onClick={closeMobileMenu}
                >
                  <span className="nav-link-label">Book a Package</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <LoginModal
            setIsLoggedIn={setIsLoggedIn}
            setUserRole={setUserRole}
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            onLoginSuccess={() => {
              setShowLoginModal(false);
              setIsLoggedIn(true);
            }}
          />
        </Container>
      </Navbar>
      
      {/* Secondary Navigation Bar */}
      <nav className={`navbar-secondary ${isFixed ? "fixed" : ""} ${isHomePage ? "home-page" : "other-page"}`}>
        <Container className="navbar-secondary-container">
          <div className="navbar-secondary-wrapper">
            {/* Left side - Main navigation */}
            <Nav className="navbar-secondary-nav navbar-secondary-nav-left">
              <Nav.Item>
                <Link
                  aria-label="Go to Home Page"
                  className="navbar-secondary-link"
                  to="/"
                >
                  <span className="nav-link-label">Home</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  aria-label="Go to Tests Page"
                  className="navbar-secondary-link"
                  to="/shop"
                >
                  <span className="nav-link-label">Book a Test</span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  aria-label="Go to Packages Page"
                  className="navbar-secondary-link"
                  to="/health-list"
                >
                  <span className="nav-link-label">Book a Package</span>
                </Link>
              </Nav.Item>
            </Nav>

            {/* Right side - Actions */}
            <Nav className="navbar-secondary-nav navbar-secondary-nav-right">
              {/* Admin link - only show for admins */}
              {userRole && userRole.toLowerCase() === "admin" && (
                <Nav.Item>
                  <Link
                    aria-label="Go to Admin Panel"
                    className="navbar-secondary-link"
                    to="/admin"
                  >
                    <span className="nav-link-label">Admin</span>
                  </Link>
                </Nav.Item>
              )}

              {/* Cart icon - always visible */}
              <Nav.Item>
                <Link
                  aria-label="Go to Cart Page"
                  className="navbar-secondary-link cart-icon-wrapper"
                  to="/cart"
                  data-num={CartItem.length}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="nav-icon"
                    aria-hidden="true"
                  >
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                </Link>
              </Nav.Item>

              {/* Logout icon - only show when logged in */}
              {isLoggedIn ? (
                <Nav.Item>
                  <button
                    aria-label="Logout"
                    className="navbar-secondary-link"
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="nav-icon"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v15.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 22h-5.5A2.25 2.25 0 013 19.75V4.25zm6.72 4.72a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H6a.75.75 0 010-1.5h6.94l-3.22-3.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Nav.Item>
              ) : (
                /* Sign In icon - show when not logged in */
                <Nav.Item>
                  <button
                    aria-label="Sign In"
                    className="navbar-secondary-link"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="nav-icon"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Nav.Item>
              )}
            </Nav>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;
