import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/view`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle shop filter change
  const handleShopChange = (event) => {
    const shopName = event.target.value;
    setSelectedShop(shopName);

    if (shopName === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.shopName === shopName);
      setFilteredProducts(filtered);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
  
    if (searchValue === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.shopName && product.shopName.toLowerCase().includes(searchValue)
      );
      setFilteredProducts(filtered);
    }
  };

  // Extract unique shop names for filter options
  const shopNames = Array.from(new Set(products.map((product) => product.shopName)));

  // Placeholder for addToCart function
  const addToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
    // Add your cart logic here
  };

  return (
    <div>
      <section className="py-3" id="Products">
        <Container>
          <h2 className="text-center mb-3 fw-bold mt-5" style={{ color: 'black' }}>
            All <span style={{ color: '#01e281' }}>Products</span>
          </h2>

          {selectedShop === 'All' ? (
            shopNames.map((shop, index) => (
              <div key={index} className="mb-4">
                <h3 className="fw-bold" style={{ color: '#01e281' }}>{shop}</h3>
                <Row>
                  {products
                    .filter((product) => product.shopName === shop)
                    .map((product) => (
                      <Col sm={6} lg={3} key={product._id} className="mb-4">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                          <Card
                            className="p-2"
                            style={{
                              border: "none",
                              borderRadius: '10px',
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Add box shadow
                              transition: 'box-shadow 0.3s ease, transform 0.3s ease', // Light popup effect
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                              e.currentTarget.style.transform = 'scale(1.02)'; // Slight scale up
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.8)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <Link>
                              <Card.Img
                                src={product.imageUrls[0]}
                                variant="top"
                                style={{
                                  height: '200px', // Adjust image height
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                            </Link>
                            <Card.Body>
                              <Link style={{ textDecoration: 'none', color: '#777', fontSize: '18px' }}>
                                <Card.Title as="div">
                                  <strong>{product.name}</strong>
                                </Card.Title>
                              </Link>
                              <Card.Text as="h5" className="fw-bold" style={{ color: 'black' }}>
                                Rs {product.price}
                              </Card.Text>
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <Button
                                  variant="warning"
                                  className="w-100"
                                  onClick={() => addToCart(product)}
                                  style={{
                                    color: 'white',
                                    background: '#082f49',
                                    fontWeight: 'bold',
                                    border: 'none',
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
                    ))}
                </Row>
              </div>
            ))
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card
                      className="p-2"
                      style={{
                        border: "none",
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Link>
                        <Card.Img
                          src={product.imageUrls[0]}
                          variant="top"
                          style={{
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      </Link>
                      <Card.Body>
                        <Link style={{ textDecoration: 'none', color: '#777', fontSize: '18px' }}>
                          <Card.Title as="div">
                            <strong>{product.name}</strong>
                          </Card.Title>
                        </Link>
                        <Card.Text as="h5" className="fw-bold" style={{ color: 'black' }}>
                          Rs {product.price}
                        </Card.Text>
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                          <Button
                            variant="warning"
                            className="w-100"
                            onClick={() => addToCart(product)}
                            style={{
                              color: 'white',
                              background: '#082f49',
                              fontWeight: 'bold',
                              border: 'none',
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
              ))}
            </Row>
          )}
        </Container>
      </section>
      <ToastContainer />
    </div>
  );
}

export default AllProductPage;
