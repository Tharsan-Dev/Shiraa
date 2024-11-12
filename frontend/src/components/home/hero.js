import React, { useState } from 'react';
import { Form, Button, Container, Row, Col,Collapse } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';


export const Hero = (props) => {
  // State to track the current image source
  const [currentImage, setCurrentImage] = useState('https://res.cloudinary.com/ddctt6pye/image/upload/v1731059994/s5metlscwn7wvxyl1bhp.png');

  // Handlers to change the image on hover
  const handleMouseEnter = () => {
    setCurrentImage('https://res.cloudinary.com/ddctt6pye/image/upload/v1731050778/jhjelpxtx0ig5erbqruz.png');
  };

  const handleMouseLeave = () => {
    setCurrentImage('https://res.cloudinary.com/ddctt6pye/image/upload/v1731059994/s5metlscwn7wvxyl1bhp.png');
  };

  // Function to scroll to the Products section
  const handleShopNowClick = () => {
    const productSection = document.getElementById('Products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to the Shops section
  const handleNearByShopsClick = () => {
    const shopSection = document.getElementById('Shops');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="Home"
      className="text-white text-center p-5 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#e2e8f0',
        height: "100vh",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
      <Container className="mt-5">
        <Row className="align-items-center">
          {/* Left Content */}
          <Col md={8} className="text-start mb-5">
            <h1 className="display-3 fw-bold " style={{ color: "#021024" }}>
              Your One-Stop Shop for Daily Needs
            </h1>

            <p className=' fs-5 text-md-center text-lg-start' style={{ color: '#818c96',textAlign:'justify',width:'740px'}}>
            Shiraa is your one-stop solution for daily essentials, connecting you with local shops for seamless shopping. Access a wide range of products easily from trusted vendors, simplifying your routine with efficient ordering. </p>
            <div>
              <Button
                className="me-2"
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
              >
                Shop Now
              </Button>
            </div>
          </Col>

          {/* Right Image */}
          <Col md={4} className="d-flex justify-content-center">
            <div style={{ width: '100%', maxWidth: '350px', marginRight: '410px' }}>
              
              <img
                src={currentImage}
                alt="Hero"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: '700px',
                  height: '700px',
                  marginTop: '20px',
                
                  cursor: 'pointer',
                  transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  behavior:'smooth'
                }}
              />
             


            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
