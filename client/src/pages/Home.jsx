import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import {
  products,
  discoutProducts,
  healthConcerns,
  checkupsMen,
  checkupsWomen,
} from "../utils/products";
import { popularTests } from "../utils/popularTests.js";
import { DataContainer } from "../App";
import SliderHome from "../components/Slider";
import HealthConcernsSection from "../components/HealthConcernsSection.jsx";
import HealthPackagesList from "./HealthPackageList.jsx";
import "../Styles/HealthPackageList.css";
import "../Styles/HealthTips.css";
import "../Styles/Accreditations.css";
import "../Styles/FAQ.css";

const Home = () => {
  const { addToCart } = useContext(DataContainer);
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "Blood");

  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also scroll after content renders to handle any layout shifts
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);
    
    return () => clearTimeout(scrollTimeout);
  }, []);

  // Unique toast ID
  const toastId = useRef(null);

  // Custom toast content with a button
  const CustomToastWithLink = ({ closeToast }) => (
    <div>
      <button
        onClick={() => {
          navigate("/cart");
          if (toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
          }
        }}
      >
        Go to Cart
      </button>
    </div>
  );

  const handleAddToCart = (item) => {
    addToCart(item);
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(<CustomToastWithLink />, {
        autoClose: false,
        onClose: () => {
          toastId.current = null;
        },
      });
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <SliderHome />
      <Wrapper />
      {/* <HealthConcernsSection title="Recommended checkups for men" bgColor="#f6f9fc" productItems={checkupsMen} addToCart={handleAddToCart} />
      <HealthConcernsSection title="Recommended checkups for women" bgColor="#f6f9fc" productItems={checkupsWomen} addToCart={handleAddToCart} /> */}

      <HealthConcernsSection
        title="Browse by Health Concerns"
        bgColor="#f6f9fc"
        productItems={healthConcerns}
        addToCart={handleAddToCart}
      />
      
      <section
        id="popular-packages"
        className="packages-section"
        style={{
          background: "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
          padding: "4rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-background">
          <div
            className="bg-circle"
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, rgba(15, 52, 96, 0.05), rgba(15, 52, 96, 0.1))",
              top: "-100px",
              right: "-100px",
              zIndex: 0,
            }}
          ></div>
          <div
            className="bg-circle"
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, rgba(15, 52, 96, 0.05), rgba(15, 52, 96, 0.1))",
              bottom: "-50px",
              left: "-50px",
              zIndex: 0,
            }}
          ></div>
        </div>

        <div
          className="packages-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* <div className="section-header" style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#0F3460",
              marginBottom: "1rem",
            }}>Popular Health Packages</h2>
            <p style={{
              fontSize: "1.1rem",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}>Comprehensive health checkups tailored to your needs</p>
          </div> */}

          <HealthPackagesList
            packageIds={["01", "02", "03", "04", "05", "06"]}
            useLocalData={true}
          />
        </div>
      </section>

      <Section
        id="popular-tests"
        title="Popular Tests"
        bgColor="#ffffff"
        productItems={popularTests}
        addToCart={handleAddToCart}
      />

      {/* Why Fortune Blood Test Section */}
      <section
        style={{
          background: "#f8f9fa",
          padding: "3rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "#dc2626",
                marginBottom: "0.5rem",
              }}
            >
              Why Fortune Blood Test?
            </h2>
            <div
              style={{
                width: "50px",
                height: "3px",
                background: "linear-gradient(90deg, #0F3460, #2a5298)",
                margin: "0 auto",
                borderRadius: "2px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {/* Item 1 - Fast Service */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "50%",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-hidden="true"
              >
                <i
                  className="fas fa-clock"
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "#dc2626",
                  marginBottom: "0.5rem",
                }}
              >
                Fast Service
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#dc2626",
                  lineHeight: "1.4",
                  margin: 0,
                }}
              >
                Quick sample collection and fast report delivery.
              </p>
            </div>

            {/* Item 2 - Accurate Results */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "50%",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-hidden="true"
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "#dc2626",
                  marginBottom: "0.5rem",
                }}
              >
                98% Accurate Results
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#dc2626",
                  lineHeight: "1.4",
                  margin: 0,
                }}
              >
                Reliable results with advanced laboratory equipment.
              </p>
            </div>

            {/* Item 3 - Affordable Pricing */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  borderRadius: "50%",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  aria-hidden="true"
                >₹</span>
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "#dc2626",
                  marginBottom: "0.5rem",
                }}
              >
                Affordable Pricing
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#dc2626",
                  lineHeight: "1.4",
                  margin: 0,
                }}
              >
                Quality healthcare at budget-friendly rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="health-tips-section">
        <div className="health-tips-container">
          <div className="health-tips-header">
            <h2 className="health-tips-title">Health Tips</h2>
            <div className="health-tips-divider"></div>
          </div>

          <div className="health-tips-grid">
            {/* Card 1: Heart Attacks */}
            <div className="health-tip-card health-tip-card-1">
              <div className="health-tip-image">
                <div className="health-tip-image-icon">❤️</div>
              </div>
              <div className="health-tip-content">
                <h3 className="health-tip-title">
                  Why Are Heart Attacks Increasing Among Young Indians? Early Signs and Prevention Tips
                </h3>
                <p className="health-tip-description">
                  Heart attacks, once an ailment of the elderly, are increasingly striking young Indians. If this trend scares you, take a moment to understand why it's happening, what are the early signs of heart attack and how to prevent it.
                </p>
              </div>
            </div>

            {/* Card 2: Cancer Risk */}
            <div className="health-tip-card health-tip-card-2">
              <div className="health-tip-image">
                <div className="health-tip-image-icon">🎗️</div>
              </div>
              <div className="health-tip-content">
                <h3 className="health-tip-title">
                  Top 5 Lifestyle Changes to Lower Your Cancer Risk
                </h3>
                <p className="health-tip-description">
                  Cancer is a major health concern in India, with 1.5 million new cases reported in 2022. Up to 50% of cancers are preventable by adopting a healthy lifestyle. This blog provides practical tips for Indian families to reduce their cancer risk.
                </p>
              </div>
            </div>

            {/* Card 3: Regular Screenings */}
            <div className="health-tip-card health-tip-card-3">
              <div className="health-tip-image">
                <div className="health-tip-image-icon">🏥</div>
              </div>
              <div className="health-tip-content">
                <h3 className="health-tip-title">
                  How do Regular Screenings Help in Preventive Healthcare and Early Detection?
                </h3>
                <p className="health-tip-description">
                  Regular health screenings are crucial for early disease detection and effective management. Many people only seek medical attention when they experience symptoms, but routine check-ups can identify issues before they become severe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="accreditations-section">
        <div className="accreditations-container">
          <div className="accreditations-header">
            <h2 className="accreditations-title">Accreditations</h2>
            <div className="accreditations-divider"></div>
          </div>

          <div className="accreditations-content">
            {/* Video Section */}
            <div className="accreditations-video">
              <iframe
                src="https://www.youtube.com/embed/M0Wk8d3VMcs?rel=0&modestbranding=1"
                title="Thyrocare - India's Largest Lab"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
              ></iframe>
            </div>

            {/* Badges Section */}
            <div className="accreditations-badges">
              <div className="accreditation-badge-wrapper">
                <div className="accreditation-badge">
                  <img 
                    src="/Images/icmr.png" 
                    alt="ICMR Approved" 
                    className="accreditation-badge-icon"
                  />
                </div>
                <div className="accreditation-badge-text">ICMR Approved</div>
              </div>
              <div className="accreditation-badge-wrapper">
                <div className="accreditation-badge">
                  <img 
                    src="/Images/nabl.jpg" 
                    alt="NABL Accredited" 
                    className="accreditation-badge-icon"
                  />
                </div>
                <div className="accreditation-badge-text">NABL Accredited</div>
              </div>
              <div className="accreditation-badge-wrapper">
                <div className="accreditation-badge">
                  <img 
                    src="/Images/cap.jpg" 
                    alt="CAP Accredited" 
                    className="accreditation-badge-icon"
                  />
                </div>
                <div className="accreditation-badge-text">CAP Accredited</div>
              </div>
              <div className="accreditation-badge-wrapper">
                <div className="accreditation-badge">
                  <img 
                    src="/Images/ngsp.jpeg" 
                    alt="NGSP Certified" 
                    className="accreditation-badge-icon"
                  />
                </div>
                <div className="accreditation-badge-text">NGSP Certified</div>
              </div>
              <div className="accreditation-badge-wrapper accreditation-badge-bottom">
                <div className="accreditation-badge">
                  <img 
                    src="/Images/iso.png" 
                    alt="ISO Certified" 
                    className="accreditation-badge-icon"
                  />
                </div>
                <div className="accreditation-badge-text">ISO Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-divider"></div>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 0 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
              >
                <span>How can I trust Thyrocare's quality?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 0 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Thyrocare is one of the first Indian diagnostic laboratories to obtain internationally renowned quality accreditations and certifications such as NABL- and CAP-accredited, NGSP- and ISO-certified, and ICMR-approved.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 1 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
              >
                <span>What are Thyrocare's USPs and trust checks?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 1 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    <li>Trained & certified technicians</li>
                    <li>Temperature-controlled sample logistics</li>
                    <li>Unique barcode tracking for every sample</li>
                    <li>Fully automated machines inspected daily</li>
                    <li>Abnormal values rechecked twice</li>
                    <li>Report verified by expert pathologists</li>
                    <li>QR code verification of reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 2 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
              >
                <span>What are the timings for sample collection at home?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 2 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  For tests/profiles requiring prior fasting, 6:00 AM to 11:00 AM is an ideal time-slot for sample collection, whereas for non-fasting tests/profiles, you can choose any time-slot till 7:00 PM. If you book your test in the first half of the day, our technicians will reach your home in 60 mins from the time of booking. Sample collections on Sundays/Holidays are not available in all the cities.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 3 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
              >
                <span>Does Thyrocare provide PET-CT scans?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 3 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Our subsidiary Nueclear offers PET-CT scans at many metro cities in India at the lowest cost in the market. For more details, visit www.nueclear.com, mail at crm@nueclear.com or call our helpline number 022-4128 9999 or 022-4128 2888 (between 7.00 AM and 10.00 PM).
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 4 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
              >
                <span>Does transportation affect the quality of reports? Are the samples stable during transit?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 4 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  We follow a triple packaging system as per WHO guidelines, wherein a barcoded vial is the primary receptacle, a thermocol box with frozen cool packs is the secondary receptacle and an outer cardboard box is the tertiary receptacle. The samples are transported in sealed containers and evaluated for factors such as temperature, hemolysis, clotting, non-barcoded samples, leakages, lipemia and wrong vials. Only samples passing through pre-analytical checks are processed.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 5 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
              >
                <span>How do I know if the reports belong to me?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 5 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  All the samples are barcoded upon collection. These barcodes are registered in the system against the order booked at Thyrocare by the service provider. We follow a triple packaging system defined by WHO. Every process in the laboratory is approved by accrediting bodies. The laboratory is fully automated for avoiding any human intervention/error. The reports are QR-coded and directly printed in accordance with the barcode. For your perusal, you are advised to note down the barcode when sample(s) are collected and cross-check the same with report(s).
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 6 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
              >
                <span>Is the deputed phlebotomist qualified to do sample collection?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 6 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  The technicians or phlebotomists assigned for specimen collections are qualified, and their experience in the field is ensured before they are assigned this task.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 7 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
              >
                <span>Can I cancel the prepaid booking and get a refund?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 7 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  The entire amount paid will be refunded in the following scenarios:
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    <li>If booking is done, but there is no service provider available in that area</li>
                    <li>If a customer has done multiple bookings due to system error</li>
                    <li>If the service provider has not made any adequate attempts to provide the service</li>
                  </ul>
                  In all other scenarios, except these three, Rs 100 will be deducted as cancellation charges. The refund will be processed within 7-10 working days directly in your source account, from where the booking was made.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 8 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 8 ? null : 8)}
              >
                <span>What if any of my tests are cancelled?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 8 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  One or more tests booked may be cancelled by the laboratory due to clinical/technical or pre-analytical reasons. You will receive information about the same via email and SMS. In such cases, our service provider shall be advised to collect the fresh specimen and process the unreported test(s) free of cost. Our team will coordinate with you for scheduling re-collection of samples and ensure that complete reports are provided on time.
                  <br /><br />
                  Alternatively, you can ask for a refund if you do not wish to go for re-collection. The refund shall be granted in full, if all tests are cancelled. The refund will be granted partially if some tests are processed and reports are released, whereas other tests are cancelled. For partial refund, the amount is calculated as per the catalogue rate of the unreported test(s) and corrected to its weighted average in the total order value. Refunds will be credited to the account of the beneficiary directly.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 9 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 9 ? null : 9)}
              >
                <span>I have got a coupon with a special offer, how can I avail the same?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 9 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  You can follow the instructions given on the coupon to avail the services. You can send us the image of the coupon on WhatsApp at 9870666333 (24x7). In case of any difficulty, please call us on 02230900000 or send an email on customersupport@thyrocare.com.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 10 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 10 ? null : 10)}
              >
                <span>How can I register a complaint?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 10 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  You can register a complaint by writing to us at complaints@thyrocare.com or calling our helpline numbers 02230900000. You can WhatsApp us at 9870666333 (24x7). If your query is not resolved, please forward the same thread to redressals@thyrocare.com. TAT for closure of complaints is 24-48 hours depending upon the nature of the complaint and resolution needs to be given.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 11 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 11 ? null : 11)}
              >
                <span>I have booked a test but did not get any call from you. What should I do?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 11 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Please write to us at orders@thyrocare.com or WhatsApp us at 9870666333. In case your query is not resolved, you can register your complaints at complaints@thyrocare.com. You can also call our helpline numbers 02230900000 or 02241252525 between 7.00 AM and 10.00 PM Monday-Sunday.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 12 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 12 ? null : 12)}
              >
                <span>I did not receive a hard copy of the reports. How can I get it?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 12 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  If you opted for a hard copy of reports and have not received it after 3 to 5 days of releasing the reports, kindly email us at orders@thyrocare.com. We will ensure that report delivery is expedited and share tracking details once the report(s) are dispatched. You can receive the report PDF on WhatsApp by requesting the same along with barcodes/order ID from the registered mobile number on 9870666333. Please note that hard report comes on an additional cost if Rs 75.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 13 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 13 ? null : 13)}
              >
                <span>I did not receive a soft copy of the reports. How can I get it?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 13 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Soft copy of the reports will automatically be sent to the mentioned email ID (if provided). In case, you have not received the same or your email ID was not updated, please email us at softcopy@thyrocare.com to get the reports. If your tests have not been processed yet, the soft copy may not be generated.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 14 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 14 ? null : 14)}
              >
                <span>Is a doctor's prescription needed to avail the testing service?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 14 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  A doctor's prescription is not required for availing any preventive healthcare package. However, in case of any illness, the patient is advised to consult their physician before booking tests/profiles.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 15 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 15 ? null : 15)}
              >
                <span>How will the reports be delivered to me?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 15 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Softcopy of reports will be sent to your registered email ID within 24 to 48 hours of sample collection depending upon the transit time. If you have opted for hard copy reports by paying extra at the time of booking (exclusive of the test/package cost), the reports would be delivered in 3 to 5 days after samples are processed. You would be notified via SMS once the soft copy of report(s) is sent to your registered email ID and hard copy report(s) are dispatched to your address with tracking details.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${openFAQ === 16 ? 'active' : ''}`}
                onClick={() => setOpenFAQ(openFAQ === 16 ? null : 16)}
              >
                <span>How soon will I get reports?</span>
                <span className="faq-icon"><i className="fas fa-chevron-down"></i></span>
              </div>
              <div className={`faq-answer ${openFAQ === 16 ? 'active' : ''}`}>
                <div className="faq-answer-content">
                  Once the specimen(s) are collected, including transit time and processing time, soft copy reports would be sent to your registered email ID within 24 to 48 hours. If you have opted for hard copy reports by paying extra at the time of booking (exclusive of the test/package cost), the reports would be delivered in 3 to 5 days after samples are processed. You would be notified via SMS once the soft copy of report(s) is sent to your registered email ID and hard copy report(s) are dispatched to your address with tracking details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #f6f9fc 0%, #edf2fb 100%)",
          padding: "3rem 0",
          borderTop: "1px solid rgba(15, 52, 96, 0.08)",
          borderBottom: "1px solid rgba(15, 52, 96, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#0F3460",
              marginBottom: "1.5rem",
            }}
          >
            Our Presence
          </h2>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1f2937",
              lineHeight: 1.8,
            }}
          >
            Agra | Ahmedabad | Aligarh | Bareilly | Bengaluru | Bhopal | Bhubaneswar | Bilaspur | Chennai | Chhattisgarh | Coimbatore | Dadar | Delhi | Dhanbad | Ernakulam | Faridabad | Ghaziabad | Goa | Gonda | Greater Noida | Gurgaon | Gwalior | Hyderabad | Indore | Jabalpur | Jaipur | Jamshedpur | Jhansi | Jodhpur | Kalyan | Kerala | Kochi | Kolkata | Kota | Lucknow | Ludhiana | Mangalore | Mulund | Mumbai | Navi Mumbai | Nizamabad | Noida | Panaji | Patiala | Patna | Pune | Rajkot | Ranchi | Ratnagiri | South Delhi | Surat | Tirupati | Udaipur | Varanasi | Venkateswara nagar | Vijayavada | Visakhapatnam | West Bengal | West Delhi
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
