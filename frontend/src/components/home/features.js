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
                //   <Card.Body>
                //     <Card.Title>Shop {shop}</Card.Title>
                //     <Card.Text>Specializing in unique local products</Card.Text>
                //     {role ? (<Button variant="link" onClick={handleViewShop}>View Shop</Button>):(null)}
                //   </Card.Body>
                // </Card>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </section>
//     </div>
//   )
// }

// export default Features;


// import React, { useEffect, useState } from 'react';
// import { Container, Button, Card, ListGroup } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Features() {
//   const [shops, setShops] = useState([]); // Initialize shops array
//   const navigate = useNavigate();

//   // Fetch shops data from backend
//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/shops/getAllShops'); 
//         const data = await response.json();
//         setShops(data); // Set the fetched shops data
//       } catch (err) {
//         console.error('Error fetching shops:', err);
//       }
//     };

//     fetchShops(); // Call the function when the component mounts
//   }, []);

//   // Handle viewing individual shop details
//   const handleViewShop = (shopId) => {
//     navigate(`/shopview/${shopId}`); // Navigate to the shopview page with shop ID
//   };

//   return (
//     <section  id='Shops' className=" bg-light">
//       <div style={{backgroundColor:'#e2e8f0'}}>
//       <Container >
//         <h2 className="text-center mb-4">Featured Shops</h2>
//         <div className="row">
//           {shops.length > 0 ? (
//             shops.map((shop) => (
//               <div key={shop._id} className="col-md-3 mb-4 d-flex">
                    
//     <Card className="my-5 p-2 " style={{ border:"",background:" #C6CDFF"}} >
//       <Link to={`/product/${shop._id}`} >
//         <Card.Img src={shop.imageUrls[0]} variant="top" style={{ height:"288px"}} />
//       </Link>

//       <Card.Body style={{ color:"white" }}>
//         <Link to={`/product/${shop._id}`} style={{ textDecoration:"none", color:"black", fontSize:"20px"}}>
//           <Card.Title as="div" >
//             <strong>{shop.name}</strong>
//           </Card.Title>
//         </Link>
        
//         {/* <Card.Text as="div">
//           <Rating
//             value={product.rating}
//             text={`${product.requirement} reviews`}
//           />
//         </Card.Text> */}
//          <Card.Text>
//                       {shop.description || 'Specializing in unique local products'}
//                     </Card.Text>

//         {/* <Card.Text as="h4">rs{product.price}</Card.Text> */}
//       </Card.Body>
//     </Card>
//                 {/* <Card style={{ width: '100%', minHeight: '100%' }}>
//                   <div style={{ height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', background:'#e2e8f0'}}>
//                     <Card.Img
//                       variant="top"
//                       src={shop.imageUrls[0]}
//                       alt={shop.name}
//                       style={{ height: '100%', width: '100%', objectFit: 'contain' }}
//                     />
//                   </div>
//                   <Card.Body className="d-flex flex-column">
//                     <Card.Title>{shop.name}</Card.Title>
//                     <Card.Text>
//                       {shop.description || 'Specializing in unique local products'}
//                     </Card.Text>
//                     <Button
//                       variant="primary"
//                       onClick={() => handleViewShop(shop._id)}
//                       className="mt-auto"
//                     >
//                       View Shop
//                     </Button>
//                   </Card.Body>
//                 </Card> */}
//               </div>
//             ))
//           ) : (
//             <p className="text-center">Loading shops...</p>
//           )}
//         </div>
//       </Container>
//       </div>
//     </section>
//   );
// };

// export default Features;



import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Features() {
  const [shops, setShops] = useState([]); // Initialize shops array
  const [role, setRole] = useState(null); // Initialize role as null
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
    <section id='Shops' className="bg-light">
      <div style={{ backgroundColor: '#e2e8f0' }}>
        <Container>
          <h2 className="text-center mb-4 fw-bold " >Discover our <span className=''style={{ color: '#01e281' }}>Shops</span></h2>
          <div className="row">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <div key={shop._id} className="col-md-3 mb-4 d-flex">
                  <Card className="my-5 p-2" style={{ background: '#C6CDFF' }}>
                    <Link to={`/product/${shop._id}`}>
                      <Card.Img src={shop.imageUrls[0]} variant="top" style={{ height: "288px" }} />
                    </Link>
                    <Card.Body style={{ color: "white" }}>
                      <Link to={`/product/${shop._id}`} style={{ textDecoration: "none", color: "black", fontSize: "20px" }}>
                        <Card.Title as="div">
                          <strong>{shop.name}</strong>
                        </Card.Title>
                      </Link>
                      <Card.Text>
                        {shop.description || 'Specializing in unique local products'}
                      </Card.Text>
                      {role && (
                        <Button variant="link" onClick={() => handleViewShop(shop._id)}>View Shop</Button>
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
