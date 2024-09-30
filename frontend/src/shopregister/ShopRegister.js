
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function ShopRegisterForm() {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    category: '',
    description: '',
    images: []  // To handle image files
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: e.target.files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.shopName);
    data.append('ownerName', formData.ownerName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('address', formData.address);
    data.append('category', formData.category);
    data.append('description', formData.description);

    // Append each image file
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/shops/ShopRegister`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  // Send cookies along with request
      });

      if (response.data) {
        alert('Shop registered successfully!');
      }
    } catch (err) {
      console.error('Error submitting the form:', err);
      alert('Failed to register shop.');
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="shopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                name="shopName"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="ownerName">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="ownerName"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Additional fields */}
        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" name="category" onChange={handleInputChange} required>
            <option>Select category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food & Beverage</option>
            <option value="home">Home & Garden</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" name="address" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Shop Description</Form.Label>
          <Form.Control as="textarea" name="description" onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button type="submit" className="mt-3">Register Shop</Button>
      </Form>
    </Container>
  );
}
