import React, { useState } from 'react';
import { Form, Button, Container, Row, Col,Collapse } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';


export const Hero = (props) => {
  // State to track the current image source
  const [currentImage, setCurrentImage] = useState('https://res.cloudinary.com/ddctt6pye/image/upload/v1731392820/shcz9zgk6uzo0ttkdiiq.png');

  // Handlers to change the image on hover
  const handleMouseEnter = () => {
    setCurrentImage('https://res.cloudinary.com/ddctt6pye/image/upload/v1731050778/jhjelpxtx0ig5erbqruz.png');
  };

  const handleMouseLeave = () => {
    setCurrentImage('https://res.cloudinary.com/ddctt6pye/image/upload/v1731392820/shcz9zgk6uzo0ttkdiiq.png');
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
      className=" text-white text-center "
      style={{
        backgroundColor: '#e2e8f0',
        height: "100vh",
        
        
      }}
    >
      
      <Container >
        <Row className="align-items-center text-start">
          {/* Left Content */}
          <Col lg={6} className=" mb-lg-0">
            <h1 className="display-3 fw-bold " style={{ color: "#021024", fontFamily:'yesova one' }}>
              Your One-Stop Shop for Daily Needs
            </h1>

            <p className=' fs-5 text-md-center text-lg-start' style={{ color: '#818c96',textAlign:'justify',justifyContent:'center',justifyItems:'center'}}>
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
          <Col lg={6} className="d-flex justify-content-center">
            <div style={{ width: '100%', maxWidth: '350px', marginRight: '310px' }}>
              
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
