import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaBox } from 'react-icons/fa';
import axios from 'axios';  // For making API requests

export default function OrderSuccessful() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details from the backend
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/create');  // Adjust your endpoint as needed
        setOrderDetails(response.data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Header className="text-center">
          <div className="mb-4">
            <FaCheckCircle size={50} className="text-success" />
          </div>
          <h2 className="fw-bold">Order Successful!</h2>
        </Card.Header>
        <Card.Body>
          <div className="mb-3 d-flex justify-content-between">
            <span className="fw-semibold">Order Number:</span>
            <span>{orderDetails?.orderNumber}</span>
          </div>
          <hr />
          <h4 className="fw-semibold mb-3">Order Summary</h4>
          <ul className="list-unstyled">
            {orderDetails?.items.map((item, index) => (
              <li key={index} className="d-flex justify-content-between mb-2">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${orderDetails?.total.toFixed(2)}</span>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          <Button className="mb-3" variant="primary" block>Proceed to Payment</Button>
          <div className="text-center text-muted">
            <FaBox className="me-2" />Your order will be processed once payment is complete.
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
