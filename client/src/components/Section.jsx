import { Container, Row } from "react-bootstrap";
import Product from "./Product/Product";

const Section = ({ id, title, bgColor, productItems, addToCart }) => {
  const enableHoverEffect = id === "popular-packages";
  
  return (
    <section id={id} style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <Row className="justify-content-center">
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
