import React from 'react';
import Slider from 'react-slick';
import HealthProduct from './Product/HealthProduct';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './HealthConcernsSection.css';

const HealthConcernsSection = ({ title, bgColor, productItems, addToCart }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleHealthConcernClick = (concernId) => {
    navigate(`/health-concern/${concernId}`);
  };

  return (
    <section className="health-concerns-section" style={{ background: bgColor }}>
      <Container>
        <div className="section-header">
          <h2>{title}</h2>
          <p>Find tests and packages based on your health concerns</p>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {productItems.map((productItem) => (
              <div key={productItem.id} className="slider-item">
                <HealthProduct
                  title={title}
                  productItem={productItem}
                  addToCart={addToCart}
                  onClick={() => handleHealthConcernClick(productItem.id)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
  );
};

export default HealthConcernsSection;
