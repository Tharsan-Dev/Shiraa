import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OrderConfirmationPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user,SetUser] =useState({})
  const [shippingAddress, setShippingAddress] = useState({ address: '', city: '',  });
  const [shippingCost] = useState(500);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('user')) || [];
    if(!user){
        navigate('/login')
    }
    setCartItems(cart);
    SetUser(user)
  }, []);

  // Calculate total price of cart items
  const getTotalPrice = () => {
    const itemTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return itemTotal + shippingCost; // Add shipping cost to total
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = () => {
    // Collect order data (cart items, shipping address, total amount)
    const orderData = {
      cartItems,
      shippingAddress,
      totalAmount: getTotalPrice(),
    };

    console.log('Order Data:', orderData);
    // Perform the order creation (backend integration here)
    // After order confirmation, navigate to a success or order details page
    navigate('/order-success'); // Placeholder for order success page
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
            {/* <Form.Group className="mb-3" controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                placeholder="Enter postal code"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                placeholder="Enter your country"
              />
            </Form.Group> */}
          </Form>
        </Col>
        <Col md={6}>
          <h5>Order Summary</h5>
          <h6> name: -{" "}{user.name}</h6>
          
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
