import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OrderConfirmationPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [shippingAddress, setShippingAddress] = useState({ address: '', city: '' });
  const [shippingCost] = useState(500);  // Fixed shipping cost
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if (!user ) {
      navigate('/login');  // Redirect to login if user is not logged in
    }
    setCartItems(cart);
    console.log("test one ",cartItems);
    
    setUser(user);
  }, [navigate]);

  // Calculate the total price of cart items
  const getTotalPrice = () => {
    const itemTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return itemTotal + shippingCost; // Add shipping cost to total
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    const orderData = {
      cartItems,
      shippingAddress,
      totalAmount: getTotalPrice(),
      shippingCost,
       // Assuming each cart item has an associated shop ID
    };

    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order created:', data);
        navigate('/order-success');
      } else {
        console.error('Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <Container className="py-5">
      <h3 className="mb-4">Order Confirmation</h3>
      <Row>
        <Col md={6}>
          <h5>Shipping Address</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Order Summary</h5>
          <h6>Name: {user.name}</h6>
          <ul>
            {cartItems.map(item => (
              <li key={item._id}>
                {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
              </li>
            ))}
          </ul>
          <h6>Shipping Cost: ${shippingCost}</h6>
          <h4>Total: ${getTotalPrice()}</h4>
          <Button variant="success" onClick={handleOrderSubmit}>
            Confirm Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderConfirmationPage;
