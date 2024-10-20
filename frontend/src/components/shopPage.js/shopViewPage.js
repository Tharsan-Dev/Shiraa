import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { ShoppingCart, Menu, Search, ChevronRight } from "react-icons/bs"; // Use Bootstrap Icons or similar
export default function ShopHomePage() {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        setRole(user.role); // Set user role if available
    }
}, []);


  const handleShopNowClick = () => {
    const productSection = document.getElementById('Products');
    if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
    }
};
  return (
    <div className="min-vh-80 bg-light text-dark">
      {/* Header */}
      {/* <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand href="#">Shiraa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Menu />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Products</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
            <div className="d-flex">
              <Button variant="outline-secondary" className="me-2">
                <Search />
              </Button>
              <Button variant="outline-secondary">
                <ShoppingCart />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      {/* Hero Section */}
      <section 
      className="py-5  text-white text-center"
      style={{  height: "100vh",backgroundColor: "#ffd800" }}
      id="Home">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-3 fw-bold" style={{ color: "black" }}>Discover Your Style with Shiraa</h2>
              <p className="lead">Elevate your wardrobe with our curated collection of trendy and comfortable clothing.</p>
              {role === 'customer'? (
                <Button size="lg" variant="light" className="text-primary" onClick={handleShopNowClick}>Shop Now</Button>) :(null) 
                }
              {
                role === 'shopOwner'&& (<Link to ='/createproduct'><Button size="lg" variant="light" className="text-primary" >Add Product</Button></Link>)
              }
              
            </Col>
            <Col lg={6}>
              <img src="/placeholder.svg" alt="Featured Product" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      {/* <section className="py-5">
        <Container>
          <h3 className="text-center mb-5">Featured Products</h3>
          <Row>
            {[1, 2, 3, 4].map((item) => (
              <Col sm={6} lg={3} key={item} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={`/placeholder.svg?height=300&width=300&text=Product ${item}`} />
                  <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>$99.99</Card.Text>
                    <Button variant="warning" className="w-100">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      {/* About/Benefits Section
      <section className="py-5 bg-secondary text-white">
        <Container>
          <h3 className="text-center mb-5">Why Choose Shiraa?</h3>
          <Row>
            {[
              { title: "Quality Materials", description: "We use only the finest fabrics for comfort and durability." },
              { title: "Trendy Designs", description: "Stay ahead of the fashion curve with our latest styles." },
              { title: "Excellent Service", description: "Our customer support team is here to assist you 24/7." },
            ].map((benefit, index) => (
              <Col md={4} key={index} className="text-center">
                <div className="bg-primary text-white rounded-circle mb-4 p-3 mx-auto" style={{ width: '50px', height: '50px' }}>
                  <ChevronRight />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      {/* Newsletter
      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h3 className="mb-4">Stay Updated</h3>
          <p className="mb-4">Subscribe to our newsletter for the latest trends and exclusive offers.</p>
          <Form className="d-flex justify-content-center">
            <Form.Control type="email" placeholder="Enter your email" className="me-2" />
            <Button variant="secondary">Subscribe</Button>
          </Form>
        </Container>
      </section> */}

      {/* Footer
      <footer className="py-5 bg-light">
        <Container>
          <Row>
            <Col md={3}>
              <h5>About Shiraa</h5>
              <p>Shiraa is your destination for trendy and comfortable clothing. We believe in quality, style, and excellent customer service.</p>
            </Col>
            <Col md={3}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark">Home</a></li>
                <li><a href="#" className="text-dark">Products</a></li>
                <li><a href="#" className="text-dark">About Us</a></li>
                <li><a href="#" className="text-dark">Contact</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Customer Service</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark">Shipping & Returns</a></li>
                <li><a href="#" className="text-dark">FAQ</a></li>
                <li><a href="#" className="text-dark">Size Guide</a></li>
                <li><a href="#" className="text-dark">Terms & Conditions</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Connect With Us</h5>
              <div className="d-flex space-x-3">
                <a href="#" className="text-dark"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-dark"><i className="bi bi-instagram"></i></a>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-4 pt-4 border-top">
            <p>&copy; 2023 Shiraa. All rights reserved.</p>
          </div>
        </Container>
      </footer> */}
    </div>
  );
}
