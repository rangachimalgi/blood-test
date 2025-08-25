import React, { Fragment, useContext, useEffect, useRef } from "react";
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

const Home = () => {
  const { addToCart } = useContext(DataContainer);
  const navigate = useNavigate();
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "Blood");

  useEffect(() => {
    window.scrollTo(0, 0);
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
    </Fragment>
  );
};

export default Home;
