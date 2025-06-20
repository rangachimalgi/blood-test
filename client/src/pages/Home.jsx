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
            toast.dismiss(toastId.current); // Dismiss the toast
            toastId.current = null; // Reset toastId
          }
        }}
      >
        Go to Cart
      </button>
    </div>
  );

  // Updated addToCart function
  const handleAddToCart = (item) => {
    addToCart(item);
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(<CustomToastWithLink />, {
        autoClose: false, // Disable the timer for this toast
        onClose: () => {
          toastId.current = null; // Reset the toastId after it's closed
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

      <section
        id="popular-packages"
        style={{
          background: "#f6f9fc",
          padding: "2rem 0",
          textAlign: "center", // 👈 Center everything inside
        }}
      >
        <div
          className="packages-list"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <HealthPackagesList title="Popular Packages" packageIds={["01", "02", "03", "04", "05", "06", "07", "08", "09"]} />
        </div>
      </section>

      <Section
        id="popular-tests"
        title="Popular Tests"
        bgColor="#f6f9fc"
        productItems={popularTests}
        addToCart={handleAddToCart}
      />

      <HealthConcernsSection
        title="Browse by Health Concerns"
        bgColor="#f6f9fc"
        productItems={healthConcerns}
        addToCart={handleAddToCart}
      />
    </Fragment>
  );
};

export default Home;
