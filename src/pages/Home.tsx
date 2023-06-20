import { Carousel, Typography, Card, Row, Col } from "antd";
import "./Home.css";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
  return (
    <div className="content">
      <div className="carousel-container">
        <Carousel>
          <div className="carousel-slide">
            <div
              className="carousel-image"
              style={{
                background:
                  "url(https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg)",
              }}
            ></div>
          </div>
          <div className="carousel-slide">
            <div
              className="carousel-image"
              style={{
                background:
                  "url(https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg)",
              }}
            ></div>
          </div>
          <div className="carousel-slide">
            <div
              className="carousel-image"
              style={{
                background:
                  "url(https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg)",
              }}
            ></div>
          </div>
        </Carousel>
      </div>

      {/* Welcoming sentence */}

      {/* Title about the furniture website */}
      <Title level={2} className="center about-title">
        About Us
      </Title>

      {/* Image */}
      <img
        className="about-image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2QIxR_qbvJyz2xUTpkt4LT5zmpEccAwvSQ&usqp=CAU"
        alt="Furniture Image"
      />

      {/* Information about the company */}
      <Paragraph className="about-paragraph">
        Our company has been providing high-quality furniture for over 20 years.
        We pride ourselves on our exceptional customer service and wide
        selection of products.
      </Paragraph>

      {/* Featured products section */}
      <Title level={3} className="center featured-title">
        Our Featured Products
      </Title>
      <Row gutter={16} className="featured-section">
        <Col span={4}>
          <Card
            hoverable
            className="featured-card"
            cover={
              <img
                alt="Product 1"
                src="https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg"
              />
            }
          >
            <Meta title="Product 1" />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            hoverable
            className="featured-card"
            cover={
              <img
                alt="Product 2"
                src="https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg"
              />
            }
          >
            <Meta title="Product 2" />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            hoverable
            className="featured-card"
            cover={
              <img
                alt="Product 3"
                src="https://cdn.decoist.com/wp-content/uploads/2015/05/DIY-rug-from-vtwonen.jpg"
              />
            }
          >
            <Meta title="Product 3" />
          </Card>
        </Col>
      </Row>

      {/* Contact section */}
      <div className="contact-section">
        <Title level={3} className="center contact-title">
          Contact
        </Title>
        <address className="contact-address">
          Address: 123 Main St, Anytown USA
          <br />
          Email: info@example.com
          <br />
          Phone: (123) 456-7890
        </address>
      </div>
    </div>
  );
};

export default Home;
