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



// import React, { useEffect, useState } from 'react';
// import { Container, Button, Card, Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';


// // Helper function to create chunks of an array
// function chunkArray(array, chunkSize) {
//   const result = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     result.push(array.slice(i, i + chunkSize));
//   }
//   return result;
// }

// function Features() {
//   const [shops, setShops] = useState([]); // Initialize shops array
//   const [role, setRole] = useState(null); // Initialize role as null
//   const navigate = useNavigate();
//    const shopChunks = chunkArray(shops, 4); // Create chunks of 4 shops





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

//     // Get user role from local storage
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       setRole(user.role); // Set user role if available
//     }
//   }, []);

//   // Handle viewing individual shop details
//   const handleViewShop = (shopId) => {
//     navigate(`/shopview/${shopId}`); // Navigate to the shopview page with shop ID
//   };

//   return (
//     <section id='Shops' className="bg-light">
//       <Container>
//         <h2 className="text-center mb- fw-bold py-3">
//           Discover our <span className='' style={{ color: '#01e281' }}>Shops</span>
//         </h2>

//         {shops.length > 0 ? (
//           <Carousel interval={1000} pause="hover" wrap={true}>
//             {shopChunks.map((chunk, index) => (
//               <Carousel.Item key={index}>
//                 <div className="d-flex justify-content-around flex-wrap">
//                   {chunk.map((shop) => (
//                     <Card key={shop._id} className="p-2 my-5 p-2 w-80 h-80" style={{  background: '#C6CDFF' }}>
//                       <Link to={`/shopview/${shop._id}`}>
//                         <Card.Img src={shop.imageUrls[0]} variant="top" style={{ height: "288px" }} />
//                       </Link>
//                       <Card.Body style={{ color: "white" }}>
//                         <Link to={`/shopview/${shop._id}`} style={{ textDecoration: "none", color: "black", fontSize: "20px" }}>
//                           <Card.Title as="div">
//                             <strong>{shop.name}</strong>
//                           </Card.Title>
//                         </Link>
//                         <Card.Text className='text-muted'>
//                           {shop.description || 'Specializing in unique local products'}
//                         </Card.Text>
//                         {role && (
//                           <Button
//                             variant="link"
//                             onClick={() => handleViewShop(shop._id)}
//                             style={{
//                               color: 'white',
//                               background: '#01e281',
//                               fontWeight: 'bold',
//                               border: "none",
//                               textDecoration: 'none'
//                             }}
//                             onMouseOver={(e) => {
//                               e.target.style.backgroundColor = '#082f49';
//                               e.target.style.color = '#01e281';
//                             }}
//                             onMouseOut={(e) => {
//                               e.target.style.backgroundColor = '#01e281';
//                               e.target.style.color = 'white';
//                             }}
//                           >
//                             View Shop
//                           </Button>
//                         )}
//                       </Card.Body>
//                     </Card>
//                   ))}
//                 </div>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         ) : (
//           <p className="text-center">Loading shops...</p>
//         )}
//       </Container>
//     </section>
//   );
// }

// export default Features;


import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiTwotoneShop } from "react-icons/ai";


// Custom previous arrow
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        // backgroundColor: '#01e281',
        borderRadius: '50%',
        padding: '10px',
        zIndex: 2,
        cursor: 'pointer',
      }}
    >
      <FaChevronLeft color="white" />
    </div>
  );
};

// Custom next arrow
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        // background: '#01e281',
        borderRadius: '50%',
        padding: '10px',
        zIndex: 2,
        cursor: 'pointer',
      }}
    >
      <FaChevronRight color="black" backgroundColor='#01e281' />
    </div>
  );
};

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

  const settings = {
    draggable: true,
    // centerMode: true,
    // centerPadding: '5px',
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // Adjust based on screen size as needed
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />, // Add the custom previous arrow component
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id='Shops' className="bg-light" >
      <Container>
        <h2 className="text-center mb- fw-bold py-3">
          Discover our <span className='' style={{ color: '#01e281' }}>Shops</span>
        </h2>

        {shops.length > 0 ? (
          <Slider {...settings} style={{ marginBottom: '50px' }}>
            {shops.map((shop) => (
              <Card key={shop._id}
                className="p-2 my-2 mx-2"
                style={{ background: "#C6CDFF" }} >

                <Link to={`/shopview/${shop._id}`}>
                  <Card.Img src={shop.imageUrls[0]}
                    variant="top"
                    style={{ height: "288px", }} />
                </Link>

                <Card.Body style={{ color: "black" }}>

                  <Link to={`/shopview/${shop._id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "20px"
                    }}>
                    <Card.Title as="div">
                      <strong>{shop.name}</strong>
                    </Card.Title>
                  </Link>

                  <Card.Text className='text-muted'>
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
                      View Shop
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Slider>
          
        ) : (
          <p className="text-center">Loading shops...</p>
        )}
            <div className="text-end" style={{ marginTop:'-50px',
            cursor:'pointer',
             }}>
            <Link to="/all-shops">
              <Button variant="info"
                style={{ background: "#082f49", color: 'white',border:'none' }}
                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                onMouseOut={(e) => (e.target.style.color = 'white')}>


                  View More
                  <AiTwotoneShop  className='fs-4'/>
                  </Button>
            </Link>
          </div>
      </Container>
    </section>
  );
}

export default Features;
