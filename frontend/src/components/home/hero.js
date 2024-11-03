import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Hero = (props) => {

        // Function to scroll to the Products section
        const handleShopNowClick = () => {
            const productSection = document.getElementById('Products');
            if (productSection) {
                productSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const handleNearByShopsClick = () => {
            const productSection = document.getElementById('Shops');
            if (productSection) {
                productSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    return (
        <>
            <section
                // id="Home"
                // className="text-white text-center p-5 d-flex align-items-center justify-content-center"
                // style={{ background: 'linear-gradient(to right, #0d6efd, #198754)', height: "100vh" }}
                id="Home"
                className="text-white text-center p-5 d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage: `url()`,
                backgroundColor: '#e2e8f0',
                  height: "100vh",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              
              
            >
              <Container className="mt-5">
      <Row className="align-items-center ">
        {/* Left Content */}
        <Col md={8} className="text-start mb-5">
          <span className="display-3 fw-bold" style={{ color:"#021024" }}>
          Your One-Stop Shop for Daily Needs
          </span>
        
          <p className=' fw-bold fs-3 text-muted'> 
          Shiraa is your one-stop destination for all your daily essentials. Seamlessly connect with local shops and discover a world of convenience at your fingertips.
          </p>
        
          {/* <Form className="d-flex justify-content-center my-4">
            <div className="d-flex flex-row ">
              <Form.Control
                type="text"
                placeholder="Search for shops or products..."
                className="me-2 rounded"
                style={{ width: '300px', height: '30px' }}
              />
              <Button style={{ height: '30px' }} variant="prboldimary">
                <BsSearch />
              </Button>
            </div>
          </Form> */}
          <div>
            <Button variant="success" className="me-2"
             style={{ color: 'white',background:'#01e281',fontWeight: 'bold',border:"none" }}
             onMouseOver={(e) => (e.target.style.backgroundColor = '#082f49')}
             onMouseOut={(e) => (e.target.style.backgroundColor = '#01e281')}
         
             onClick={handleShopNowClick}>
              Shop Now
            </Button>
            {/* <Button variant="dark" onClick={handleNearByShopsClick}>
              Explore Shops Near You
            </Button> */}
          </div>
        </Col>
        
       {/* Right Image */}
<Col md={4} className="d-flex justify-content-center ">
  <div style={{ width: '100%', maxWidth: '300px',marginRight:'200px' }}> {/* Adjust maxWidth as needed */}
    <img 
      src="https://res.cloudinary.com/ddctt6pye/image/upload/v1730362962/hbqd7qq4fcmkpp3izoe9.png" 
      alt="..." 
      style={{
        width: '500px',
        height: '500px',
        
      }}
    />
  </div>
</Col>

      </Row>
    </Container>
            </section>
        </>
    );
};
