import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('An error occurred during payment processing. Please try again later.');
    }
  };

  const handleOrderSubmit = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before confirming the order.");
      return;
    }

    const orderData = {
      cartItems,
      shippingAddress,
      totalAmount: getTotalPrice(),
      shippingCost,
      user:user.name
    };
    // toast.success(order place successfully)

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
        toast.error('Failed to create order. Please try again.');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      toast.error('An error occurred while creating the order. Please try again later.');
    }
  };

  return (

    <div
    className='grid'
    style={{
        backgroundImage: 'url(https://res.cloudinary.com/ddctt6pye/image/upload/v1731483249/vdgjugdz5rhcewmahy62.jpg)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(100px)',
        padding: '20px',
        margin: '100px auto',
        marginLeft: '200px',
        borderRadius: '15px',
        maxWidth: 'calc(100% - 400px)',
        maxHeight:'700px'
    }}
>
    <Container className="py-3">
      {/* <h3 className="mb-4"> </h3> */}
      <h2 className="text-center mb- fw-bold py-3">
      Order <span className='' style={{ color: '#01e281' }}>Confirmation</span>
        </h2>
      <Row>
        <Col md={6}>
          <h5 className='fw-bold'
          style={{
            fontSize:'20px ',
            
          }}>Shipping Address</h5>
          <Form>
            <Form.Group className="mb-3 fw-bold" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group className="mb-3 fw-bold" controlId="formCity">
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
          <h5 className='fw-bold'
          style={{
            fontSize:'20px '}}>
            Order Summary
            </h5>
          <h6 className='fw-bold'>
            Name: {user.name}
            </h6>
          <ul className='fw-bold'>
            {cartItems.map(item => (
              <li key={item._id}>
                {item.name} - {item.quantity} x Rs{item.price} = Rs{item.quantity * item.price}
              </li>
            ))}
          </ul>
          <h6 className='fw-bold'>
            Shipping Cost: Rs{shippingCost}
          </h6>
          <h4>Total: Rs{getTotalPrice()}</h4>
          <Button 
          variant="success" 
          
          className="w-90"
          // onClick={() => addToCart(product)}
          style={{
            color: 'white',
            background: '#082f49',
            fontWeight: 'bold',
            border: "none"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#01e281';
            e.target.style.color = '#082f49';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#082f49';
            e.target.style.color = 'white';
          }}
          onClick={handleOrderSubmit}
          >
            Confirm Order
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default OrderConfirmationPage;
