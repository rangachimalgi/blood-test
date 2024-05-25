import React from 'react';
import Slider from 'react-slick';
import HealthProduct from './Product/HealthProduct';
import { Container } from 'react-bootstrap';

const HealthConcernsSection = ({ title, bgColor, productItems, addToCart }) => {
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
