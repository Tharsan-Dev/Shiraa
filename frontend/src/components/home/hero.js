import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
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
                id="Home"
                className="text-white text-center p-5 d-flex align-items-center justify-content-center"
                style={{ background: 'linear-gradient(to right, #0d6efd, #198754)', height: "100vh" }}
            >
                <Container className="text-center">
                    <h1 className="display-4 fw-bold">One Click to Your Favorite Shops</h1>
                    <Form className="d-flex justify-content-center my-4">
                        <div className='d-flex flex-row justify-content-center'>
                            <Form.Control
                                type="text"
                                placeholder="Search for shops or products..."
                                className="me-2 rounded"
                                style={{ width: '300px', height: "30px" }}
                            />
                            <Button style={{ height: "30px" }} variant="primary">
                                <BsSearch />
                            </Button>
                        </div>
                    </Form>
                    <div>
                        <Button variant="success" className="me-2" onClick={handleShopNowClick}>
                            Shop Now
                        </Button>
                        <Button variant="outline-light" onClick={handleNearByShopsClick}>Explore Shops Near You</Button>
                    </div>
                </Container>
            </section>
        </>
    );
};
