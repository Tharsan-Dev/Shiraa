// import React, { useState, useEffect } from 'react';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load the cart items from localStorage on initial render
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));  // Parse JSON string back to array
//     }
//   }, []);

//   // Function to add a product to the cart
//   const addToCart = (product) => {
//     // Check if product already exists in cart
//     const existingProduct = cartItems.find((item) => item.id === product.id);
//     let updatedCart;

//     if (existingProduct) {
//       // If it exists, just increase the quantity
//       updatedCart = cartItems.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       // Otherwise, add the new product with quantity 1
//       updatedCart = [...cartItems, { ...product, quantity: 1 }];
//     }

//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
//   };

//   return (
//     <div>
//       {/* Add your product list and "Add to Cart" button here */}
//       <button onClick={() => addToCart({ id: 1, name: "Product 1", price: 10 })}>
//         Add Product 1 to Cart
//       </button>
//       {/* List cart items */}
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.quantity} (Price: {item.price * item.quantity})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, ButtonGroup } from 'react-bootstrap';
import { redirect, useNavigate } from 'react-router-dom';



function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [role, setRole] = useState(null); // Initialize as null for better type checking
  const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRole(user.role); // Set user role if available
        }
    }, []);

  // Fetch cart items from localStorage
  useEffect(() => {
    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
    };

    fetchCartItems();
  }, []);

  // Calculate total price of cart items
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Increment the quantity of a product
  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleOrderCreate = () => {
    if (!role) {
      navigate('/login');
    } else {
      navigate('/order-confirmation');
    }
  };

  // Decrement the quantity of a product
  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <section className="py-5" id='Cart'>
        <Container>
          <h3 className="text-center mb-5">Your Cart</h3>
          <Row>
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <Col sm={6} lg={3} key={product._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Img 
                      variant="top" 
                      src={product.imageUrls[0]} // Assuming the first image URL is used
                      alt={product.name} 
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Price: ${product.price}</Card.Text>
                      <Card.Text>
                        Quantity: 
                        <ButtonGroup className="ml-2">
                          <Button variant="outline-primary" onClick={() => decrementQuantity(product._id)}>-</Button>
                          <Button variant="outline-secondary" disabled>{product.quantity}</Button>
                          <Button variant="outline-primary" onClick={() => incrementQuantity(product._id)}>+</Button>
                        </ButtonGroup>
                      </Card.Text>
                      <Card.Text>Total: ${product.price * product.quantity}</Card.Text>
                      <Button 
                        variant="danger" 
                        className="w-100" 
                        onClick={() => removeFromCart(product._id)}
                      >
                        Remove from Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </Row>
          {cartItems.length > 0 && (
            <div className="text-center mt-4">
              <h4>Total Price: ${getTotalPrice()}</h4>
              <Button variant="success"onClick={handleOrderCreate}>Proceed to Checkout</Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default CartPage;
