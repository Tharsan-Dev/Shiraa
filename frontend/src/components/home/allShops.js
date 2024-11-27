import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Features() {
  const [shops, setShops] = useState([]); // Initialize shops array
  const [role, setRole] = useState(null); // Initialize role as null
  const navigate = useNavigate();

  // Fetch shops data from backend
  // `${process.env.REACT_APP_BACKEND_URL}/api/products/view`
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/shops/getAllShops`);
        const data = await response.json();
        setShops(data); // Set the fetched shops data
      } catch (err) {
        console.error('Error fetching shops:', err);
      }
    };

    fetchShops(); // Call the function when the component mounts

    // Get user role from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRole(user.role); // Set user role if available
    }
  }, []);

  // Handle viewing individual shop details
  const handleViewShop = (shopId) => {
    navigate(`/shopview/${shopId}`); // Navigate to the shopview page with shop ID
  };

  return (
    <section id="Shops" className="bg-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          padding: '30px',
          marginTop:'70px',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '1200px',
          background: 'rgba(255, 255, 255, 0.15)', // Glass effect
          backdropFilter: 'blur(10px)', // Blur background
          webkitBackdropFilter: 'blur(10px)', // Safari support
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)', // Box shadow
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container>
          <h2 className="text-center mb-4 fw-bold py-3">
            Discover our <span style={{ color: '#01e281' }}>Shops</span>
          </h2>
          <div className="row">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <div key={shop._id} className="col-md-3 mb-4">
                  <Card className="p-2" style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
                    <Link to={`/shopview/${shop._id}`}>
                      <Card.Img src={shop.imageUrls[0]} variant="top" style={{ height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
                    </Link>
                    <Card.Body style={{ color: 'black' }}>
                      <Link to={`/shopview/${shop._id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
                        <Card.Title>
                          <strong>{shop.name}</strong>
                        </Card.Title>
                      </Link>
                      <Card.Text className="text-muted">
                        {shop.description || 'Specializing in unique local products'}
                      </Card.Text>
                      {role && (
                        <Button
                          variant="link"
                          onClick={() => handleViewShop(shop._id)}
                          style={{
                            color: 'white',
                            background: '#082f49',
                            fontWeight: 'bold',
                            border: 'none',
                            textDecoration: 'none',
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
                          View Shop
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">Loading shops...</p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Features;
