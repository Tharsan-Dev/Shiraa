import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function ShopProductPage() {
  const [products, setProducts] = useState([]);
  const  id  = useParams(); 
  console.log('msg @',id);
  


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/viewShops/${id.shopId}`);
        const data = await response.json();
        console.log(data, "data");
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    if (id) {
      fetchProducts(); // Fetch products only if 'id' is available
    }
  }, [id]);  // Add 'id' to the dependency array to refetch when it changes

    // Add product to localStorage cart
    const addToCart = (product) => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if product is already in the cart
      const productExists = cartItems.find((item) => item._id === product._id);
      
      if (productExists) {
        // If product is already in the cart, increment the quantity
        const updatedCart = cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // If product is not in the cart, add it with quantity 1
        const updatedCart = [...cartItems, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
  
      toast.success(`${product.name} added to cart!`);
    };
  

  return (
    <div>
     <section className="py-5" id='Products' style={{ backgroundColor: '' }}>
        <Container>
          <h3 className="text-center mb-3 fw-bold"><span style={{ color: '#082f49' }}>Products</span></h3>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }} // Scale the button on hover
                    transition={{ type: 'spring', stiffness: 50 }}
                    >
                 <Card className="my-5 p-2" style={{ border: "none", }}>
                    <Link >
                      <Card.Img 
                      src={product.imageUrls[0]} 
                      variant="top" 
                      style={{height:'280px', width:'290px'}}
                       />
                    </Link>

                    <Card.Body style={{ color: "white" }}>
                      <Link  style={{ textDecoration: "none", color: "#777", fontSize: "20px" }}>
                        <Card.Title as="div">
                          <strong>{product.name}</strong>
                        </Card.Title>
                      </Link>
                      <Card.Text as="h5" className='fw-bold' style={{ textDecoration: "none", color: "black"}}>Rs {product.price}</Card.Text>
                      {/* <motion.div
                        whileHover={{ scale: 1.1 }} // Scale the button on hover
                        transition={{ type: 'spring', stiffness: 300 }}
                      > */}
                        <Button
                          variant="warning"
                          className="w-90"
                          onClick={() => addToCart(product)}
                          style={{
                            color: 'white',
                            background: '#082f49',
                            fontWeight: 'bold',
                            border: "none",
                            textDecoration: 'none'
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
                      {/* </motion.div> */}
                    </Card.Body>
                  </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <p className="text-center">Loading products...</p>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default ShopProductPage;
