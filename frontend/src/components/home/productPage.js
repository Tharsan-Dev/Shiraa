import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductPage() {
  const [products, setProducts] = useState([]);

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

    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ backgroundColor: '#e2e8f0' }}>
      <section className="py-5" id='Products'>
        <Container>
        <h2 className="text-center mb-5 fw-bold" >Best Seller  <span className=''style={{ color: '#01e281' }}>Products</span></h2>
        <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                   <Card className="my-5 p-2 " style={{ border:"",background:" #C6CDFF"}} >
      <Link to={`/product/${product._id}`} >
        <Card.Img src={product.imageUrls[0]}  variant="top" style={{ height:"288px"}} />
      </Link>

      <Card.Body style={{ color:"white" }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration:"none", color:"black", fontSize:"20px"}}>
          <Card.Title as="div" >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.requirement} reviews`}
          />
        </Card.Text> */}
         {/* <Card.Text>
                      {product.description || 'Specializing in unique local products'}
                    </Card.Text> */}
                      <Card.Text as="h4">rs{product.price}</Card.Text>
  <Button 
                        variant="warning" 
                        className="w-100" 
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
      
      </Card.Body>
    </Card>
                  {/* <Card className="h-100">
                    <Card.Img 
                      variant="top" 
                      src={product.imageUrls[0]} // Assuming the first image URL is used
                      alt={product.name} 
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button 
                        variant="warning" 
                        className="w-100" 
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card> */}
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

export default ProductPage;
