import React from 'react';
import Slider from 'react-slick';
import HealthProduct from './Product/HealthProduct';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const HealthConcernsSection = ({ title, bgColor, productItems, addToCart }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false, // Set to false to avoid infinite scrolling
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false, // Ensure this is false to avoid infinite scrolling
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false, // Ensure this is false to avoid infinite scrolling
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false, // Ensure this is false to avoid infinite scrolling
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false, // Ensure this is false to avoid infinite scrolling
        },
      },
    ],
  };

  const handleHealthConcernClick = (concernId) => {
    navigate(`/health-concern/${concernId}`);
  };

  return (
    <section style={{ background: bgColor }}>
      <Container>
        <h2>{title}</h2>
        <Slider {...settings}>
          {productItems.map((productItem) => (
            <div key={productItem.id}>
              <HealthProduct
                title={title}
                productItem={productItem}
                addToCart={addToCart}
                onClick={() => handleHealthConcernClick(productItem.id)}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

// Sample arrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
};

export default HealthConcernsSection;
