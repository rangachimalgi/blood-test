import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import { SliderData } from "../utils/products"
import "./Slider.css"
import { Link } from "react-router-dom"

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    fade: true,
  }

  return (
    <section className='slider-section'>
      <Container className="slider-container">
        <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <div key={index} className="slider-item">
                <img 
                  src={value.cover} 
                  alt={value.title} 
                  className="slider-image"
                />
                {/* <div className="slider-overlay"></div> */}
                <div className="slide-content">
                  {/* <h1 className="slide-title">{value.title}</h1>
                  <p className="slide-description">{value.desc}</p>
                  <Link to={value.path} className="slide-button">
                    Book Now
                  </Link> */}
                </div>
              </div>
            )
          })}
        </Slider>
      </Container>
    </section>
  )
}

export default SliderHome
