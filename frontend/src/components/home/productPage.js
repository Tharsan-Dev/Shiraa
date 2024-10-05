import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

function ProductPage() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/view'); // Replace with your actual API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <section className="py-5" id='Products'>
        <Container>
          <h3 className="text-center mb-5">Featured Products</h3>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Img 
                      variant="top" 
                      src={product.imageUrls[0]} // Assuming the first image URL is used
                      alt={product.name} 
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button variant="warning" className="w-100">Add to Cart</Button>
                    </Card.Body>
                  </Card>
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
