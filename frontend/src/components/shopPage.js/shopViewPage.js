import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagegif from '../image/DreamAcres-ezgif.com-gif-maker.gif'
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
        style={{ height: "100vh", backgroundColor: "#e2e8f0" }}
        id="Home">
        <Container>
          <Row className="align-items-center text-start">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-3 fw-bold mt-5" style={{ color: "#021024" }}>Discover Your Style with Shiraa</h2>
              <p className="lead text-muted" >"Elevate your daily essentials with our curated collection of quality, fresh, and convenient grocery items, tailored for your needs. Discover everything your kitchen craves, all in one place!"</p>
              {role === 'customer' ? (
                <Button size="lg"
                  variant="light"
                  
                  style={{
                    color: 'white',
                    background: '#082f49',
                    fontWeight: 'bold',
                    border: "none",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#01e281';
                    e.target.style.color = '#082f49';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#082f49';
                    e.target.style.color = 'white';
                  }}
                  onClick={handleShopNowClick}
                >Shop Now
                </Button>) : (null)
              }
              {
                role === 'shopOwner' && (<Link to='/createproduct'><Button size="lg"

                  className=""
                  style={{
                    color: 'white',
                    background: '#082f49',
                    fontWeight: 'bold',
                    border: "none",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#01e281';
                    e.target.style.color = '#082f49';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#082f49';
                    e.target.style.color = 'white';
                  }}
                >Add Product
                </Button>
                </Link>)
              }

            </Col>
            <Col lg={6}>
              <img src={imagegif}
                alt="Featured Product"
                className="img-fluid rounded shadow"
                style={{
                  marginTop: '100px',
                  height: '500px',
                  marginLeft: '60px'
                }} />
            </Col>
          </Row>
        </Container>
      </section>




    </div>
  );
}
