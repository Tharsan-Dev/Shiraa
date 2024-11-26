import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/view');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Add product to localStorage cart
  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cartItems.find((item) => item._id === product._id);

    if (productExists) {
      const updatedCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    toast.success(`${product.name} added to cart!`);
  };

  // Get current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle next and previous page click
  const nextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <section className="py-3" id='Products'>
        <Container>
          <h2 className="text-center mb-3 fw-bold" style={{ color: 'black' }}>
            Best Seller <span style={{ color: '#01e281' }}>Products</span>
          </h2>
          <Row>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 50 }}>
                    <Card className="my-5 p-2" style={{ border: "none" }}>
                      <Link>
                        <Card.Img src={product.imageUrls[0]} variant="top" style={{ height: '280px', width: '290px' }} />
                      </Link>
                      <Card.Body>
                        <Link style={{ textDecoration: "none", color: "#777", fontSize: "20px" }}>
                          <Card.Title as="div">
                            <strong>{product.name}</strong>
                          </Card.Title>
                        </Link>
                        <Card.Text as="h5" className='fw-bold' style={{ color: "black" }}>
                          Rs {product.price}
                        </Card.Text>
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                          <Button
                            variant="warning"
                            className="w-90"
                            onClick={() => addToCart(product)}
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
                          >
                            Add to Cart
                          </Button>
                        </motion.div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <p className="text-center">Loading products...</p>
            )}
          </Row>
          <div className="d-flex justify-content-between">
            <Button
              onClick={prevPage}
              className="me-2" // Corrected class name
              disabled={currentPage === 1}
              style={{
                color: 'white',
                background: '#082f49', // Custom background color
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              <AiOutlineLeft className="me-2" /> {/* Left arrow icon */}
              Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={indexOfLastProduct >= products.length}
              style={{
                color: 'white',
                background: '#082f49', // Custom background color for Next button
                fontWeight: 'bold',
                border: 'none',
              }}
            // onMouseOver={(e) => {
            //   e.target.style.backgroundColor = '#01e281'; // On hover background color
            //   e.target.style.color = '#082f49'; // On hover text color
            // }}
            // onMouseOut={(e) => {
            //   e.target.style.backgroundColor = '#082f49'; // Reset background color
            //   e.target.style.color = 'white'; // Reset text color
            // }}
            >
              Next
              <AiOutlineRight className="ms-2" /> {/* Right arrow icon */}
            </Button>
          </div>

          <div className="text-center" style={{ marginTop: '-33px' }}>
            <Link to="/all-products">
              <Button variant="info"
                style={{ background: "#082f49", color: 'white', border: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                onMouseOut={(e) => (e.target.style.color = 'white')}>View All Products</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ProductPage;
