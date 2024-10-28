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

    if (!user.name) {
      navigate('/login');
    }
    setCartItems(cart);
    setUser(user);
  }, [navigate]);

  const getTotalPrice = () => {
    const itemTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return itemTotal + shippingCost;
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePayment = async (id) => {
    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ user: user.name, total: getTotalPrice(), orderId: id }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;  // Redirect to Stripe payment
      } else {
        console.error('Payment failed');
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred during payment processing. Please try again later.');
    }
  };

  const handleOrderSubmit = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before confirming the order.");
      return;
    }

    const orderData = {
      cartItems,
      shippingAddress,
      totalAmount: getTotalPrice(),
      shippingCost,
      user:user.name
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
        await handlePayment(data._id);
      } else {
        console.error('Failed to create order');
        alert('Failed to create order. Please try again.');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      alert('An error occurred while creating the order. Please try again later.');
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
