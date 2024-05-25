import { Fragment, useContext, useEffect } from "react"
import Wrapper from "../components/wrapper/Wrapper"
import Section from "../components/Section"
import {products ,discoutProducts, popularTests, healthConcerns, checkupsMen, checkupsWomen } from "../utils/products"
import { DataContainer } from "../App"
import SliderHome from "../components/Slider"
import HealthConcernsSection from "../components/HealthConcernsSection.jsx"

const Home = () => {
  const {addToCart} =useContext(DataContainer);
  const newArrivalData = products.filter(item => item.category ==="mobile" || item.category ==="wireless");
  const bestSales = products.filter(item => item.category ==="Blood");
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
  return (
    <Fragment>
      <SliderHome/>
      <Wrapper />
      <HealthConcernsSection title="Recommended checkups for men" bgColor="#f6f9fc" productItems={checkupsMen} addToCart={addToCart}/>
      <HealthConcernsSection title="Recommended checkups for women" bgColor="#f6f9fc" productItems={checkupsWomen} addToCart={addToCart}/>
      <HealthConcernsSection title="Browse by Health Concerns" bgColor="#f6f9fc" productItems={healthConcerns} addToCart={addToCart}/>
      <Section title="Popular Packages" bgColor="#f6f9fc" productItems={discoutProducts} addToCart={addToCart}/>
      <Section title="Popular Tests" bgColor="#f6f9fc" productItems={popularTests} addToCart={addToCart} />
    </Fragment>
  )
}

export default Home
