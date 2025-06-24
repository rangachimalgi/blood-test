import { Container, Row } from "react-bootstrap";
import Product from "./Product/Product";
import "./Section.css";

const Section = ({ id, title, bgColor, productItems, addToCart }) => {
  const enableHoverEffect = id === "popular-packages";
  
  return (
    <section id={id} style={{ background: bgColor }}>
      <Container>
        <div className="section-header">
          <h2>{title}</h2>
          <p>Discover our most requested diagnostic tests</p>
        </div>
        <Row className="justify-content-center product-grid">
          {productItems.map((productItem) => (
            <Product
              key={productItem.id}
              title={title}
              productItem={productItem}
              desc={productItem.desc}
              addToCart={addToCart}
              enableHoverEffect={enableHoverEffect}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
