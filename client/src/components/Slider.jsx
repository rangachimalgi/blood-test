import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import { SliderData } from "../utils/products"
import "./Slider.css"

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: true,
  }
  return (
    <section className='slider-section'>
      <Container className="slider-container">
        <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <div key={index}>
                <img 
                  src={value.cover} 
                  alt={value.title} 
                  className="slider-image"
                />
              </div>
            )
          })}
        </Slider>
      </Container>
    </section>
  )
}

export default SliderHome
