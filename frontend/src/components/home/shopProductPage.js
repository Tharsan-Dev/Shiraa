import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ShopProductPage() {
  const [products, setProducts] = useState([]);
  const  id  = useParams(); 
  console.log(id);
  


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
  
      alert(`${product.name} added to cart!`);
    };
  

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
                      <Button 
                        variant="warning" 
                        className="w-100" 
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
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

export default ShopProductPage;
