// import React, { useEffect, useState } from 'react';
// import {Container, Button,  Card,  } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// function Features() {

//   const [role, setRole] = useState(null); // Initialize as null for better type checking
  
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       setRole(user.role); // Set user role if available
//     }
//   }, []);
  
//   const navigate = useNavigate();

//   const handleViewShop = () => {
//     navigate('/shopview'); // Navigate to the shopview page
//   };
//   return (
//     <div>
//              <section id='Shops' className="py-5 bg-light">
//         <Container>
//           <h2 className="text-center mb-4">Featured Shops</h2>
//           <div className="row">
//             {[1, 2, 3, 4, 5, 6].map((shop) => (
//               <div key={shop} className="col-md-4 mb-4">
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
//                   <Card.Body>
//                     <Card.Title>Shop {shop}</Card.Title>
//                     <Card.Text>Specializing in unique local products</Card.Text>
//                     {role ? (<Button variant="link" onClick={handleViewShop}>View Shop</Button>):(null)}
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </section>
//     </div>
//   )
// }

// export default Features;


import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Features() {
  const [shops, setShops] = useState([]); // Initialize shops array
  const navigate = useNavigate();

  // Fetch shops data from backend
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops/getAllShops'); 
        const data = await response.json();
        setShops(data); // Set the fetched shops data
      } catch (err) {
        console.error('Error fetching shops:', err);
      }
    };

    fetchShops(); // Call the function when the component mounts
  }, []);

  // Handle viewing individual shop details
  const handleViewShop = (shopId) => {
    navigate(`/shopview/${shopId}`); // Navigate to the shopview page with shop ID
  };

  return (
    <div>
      <section id='Shops' className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Featured Shops</h2>
          <div className="row">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <div key={shop._id} className="col-md-4 mb-4">
                  <Card>
                    {/* Display the shop image from Cloudinary */}
                    <Card.Img 
                      variant="top" 
                      src={shop.imageUrls[0]} // Assuming the first image URL is used
                      alt={shop.name}  
                    />
                    <Card.Body>
                      <Card.Title>{shop.name}</Card.Title>
                      <Card.Text>{shop.description || 'Specializing in unique local products'}</Card.Text>
                      <Button variant="link" onClick={() => handleViewShop(shop._id)}>
                        View Shop
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">Loading shops...</p>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Features;


