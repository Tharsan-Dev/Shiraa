import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    images: []
  });

  const navigate = useNavigate();

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

    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/shops/ShopRegister`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data) {
        // localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('data one',response.data.user);
        
        toast.success('Shop registered successfully!');
       setTimeout(() => {
        navigate('/shopview');
       }, 1000);
      }
    } catch (err) {
      console.error('Error submitting the form:', err);
      toast.error('Failed to register shop.');
    }
  };

  return (

    <div className='d-flex flex-row'>
      {/* <div > <h1>fjgfghdfgh</h1></div> */}
      <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
        <Container
          style={{
            maxWidth: '500px',
            marginTop: '10px',
            marginBottom: '10px',
            backgroundColor: '#94a3b8',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            border: '2px solid #334155',
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: '#334155',
              fontWeight: 'bold',
            }}
          >
            Register Your Shop
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="shopName">
                  <Form.Label style={{ color: '#334155' }}>Shop Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="shopName"
                    placeholder="Enter shop name"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ownerName">
                  <Form.Label style={{ color: '#334155' }}>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    placeholder="Enter owner name"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label style={{ color: '#334155' }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label style={{ color: '#334155' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label style={{ color: '#334155' }}>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label style={{ color: '#334155' }}>Category</Form.Label>
              <Form.Control as="select" name="category" onChange={handleInputChange} required>
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food & Beverage</option>
                <option value="home">Home & Garden</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label style={{ color: '#334155' }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Enter address"
                rows={2}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label style={{ color: '#334155' }}>Shop Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter description"
                rows={3}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="images" className="mb-3">
              <Form.Label style={{ color: '#334155' }}>Upload Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              style={{
                backgroundColor: '#334155',
                borderColor: '#334155',
              }}
            >
              Register Shop
            </Button>
          </Form>
        </Container>
      </div>
    </div>


  );
}


// import React, { useState } from 'react';
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 

// export default function ShopRegisterForm() {
//   const [formData, setFormData] = useState({
//     shopName: '',
//     ownerName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     address: '',
//     category: '',
//     description: '',
//     images: []  // To handle image files
//   });

//   const [errors, setErrors] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       images: e.target.files
//     }));
//   };

//   const validateForm = () => {
//     // Simple validation for empty fields
//     if (!formData.shopName || !formData.email || !formData.password || !formData.category || !formData.images.length) {
//       setErrors('All fields are required, including at least one image.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const data = new FormData();
//     data.append('name', formData.shopName);
//     data.append('ownerName', formData.ownerName);
//     data.append('email', formData.email);
//     data.append('password', formData.password);
//     data.append('phoneNumber', formData.phoneNumber);
//     data.append('address', formData.address);
//     data.append('category', formData.category);
//     data.append('description', formData.description);

//     // Append each image file to form data
//     for (let i = 0; i < formData.images.length; i++) {
//       data.append('images', formData.images[i]);
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/shops/ShopRegister`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         withCredentials: true,  // Send cookies along with request
//       });

//       if (response.data) {
//         alert('Shop registered successfully!');
//         navigate('/shopview');
//       }
//     } catch (err) {
//       console.error('Error submitting the form:', err);
//       setErrors('Failed to register the shop. Please try again.');
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Form onSubmit={handleSubmit}>
//         {errors && <div className="alert alert-danger">{errors}</div>}
//         <Row>
//           <Col>
//             <Form.Group controlId="shopName">
//               <Form.Label>Shop Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="shopName"
//                 value={formData.shopName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="ownerName">
//               <Form.Label>Owner Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col>
//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="phoneNumber">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="category">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             as="select"
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select category</option>
//             <option value="clothing">Clothing</option>
//             <option value="electronics">Electronics</option>
//             <option value="food">Food & Beverage</option>
//             <option value="home">Home & Garden</option>
//             <option value="other">Other</option>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="address">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="description">
//           <Form.Label>Shop Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </Form.Group>

//         <Form.Group controlId="images">
//           <Form.Label>Upload Images</Form.Label>
//           <Form.Control
//             type="file"
//             name="images"
//             multiple
//             onChange={handleImageChange}
//           />
//         </Form.Group>

//         <Button type="submit" className="mt-3">Register Shop</Button>
//       </Form>
//     </Container>
//   );
// }