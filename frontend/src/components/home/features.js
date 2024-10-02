import React, { useEffect, useState } from 'react';
import {Container, Button,  Card,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Features() {

  const [role, setRole] = useState(null); // Initialize as null for better type checking
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRole(user.role); // Set user role if available
    }
  }, []);
  
  const navigate = useNavigate();

  const handleViewShop = () => {
    navigate('/shopview'); // Navigate to the shopview page
  };
  return (
    <div>
             <section id='Shops' className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Featured Shops</h2>
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((shop) => (
              <div key={shop} className="col-md-4 mb-4">
                <Card>
                  <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
                  <Card.Body>
                    <Card.Title>Shop {shop}</Card.Title>
                    <Card.Text>Specializing in unique local products</Card.Text>
                    {role ? (<Button variant="link" onClick={handleViewShop}>View Shop</Button>):(null)}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Features;