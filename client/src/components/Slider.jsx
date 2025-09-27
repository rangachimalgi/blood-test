import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import { SliderData } from "../utils/products"
import "./Slider.css"
import { Link } from "react-router-dom"
import HeroImage from "../Images/HeroOr.png"

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
                {/* <img 
                  src={value.cover} 
                  alt={value.title} x`x
                  className="slider-image"
                /> */}
                <div className="dark-grey-box">
                  <div className="hero-image-container">
                    <img src={HeroImage} alt="Lab scientist" className="hero-image" />
                  </div>
                  <div className="slide-content">
                    <h1 className="slide-title">Lab Tests at the Comfort of Your Home</h1>
                    <div className="health-categories-button">
                      <Link to="/health-concern/01" className="health-category-link">Full Body Checkups</Link>
                      <Link to="/health-concern/02" className="health-category-link">Heart</Link>
                      <Link to="/health-concern/03" className="health-category-link">Diabetes</Link>
                      <Link to="/health-concern/05" className="health-category-link">Thyroid</Link>
                      <Link to="/health-concern/06" className="health-category-link">Cancer</Link>
                      <Link to="/health-concern/04" className="health-category-link">Fever</Link>
                      <Link to="/health-concern/07" className="health-category-link">Hair and Skin Care</Link>
                      <Link to="/health-concern/08" className="health-category-link">STD</Link>
                    </div>
                    <p className="slide-description">The best of doctors, technology and care you deserve now available for you at your doorstep.</p>
                    {/* <Link to={value.path} className="slide-button">
                      Book Now
                    </Link> */}
                  </div>
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
