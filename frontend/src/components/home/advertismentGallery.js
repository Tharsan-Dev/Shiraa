// import React, { useState } from 'react';
// import { Container, Row, Col, Image } from 'react-bootstrap';

// const AdvertisementGallery = () => {
//     // Replace these URLs with your advertisement image URLs
//     const images = [
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/ngdvaokmlds6zu43rhcy.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/v2dahabr0loez7ss9yro.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/xykkhjmxa4qgwfuj5ht2.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/nmitz2satybqqcwkonyv.jpg'
//     ];

//     // Styles for each image
//     const imageStyles = [
//         { border: '2px solid black', borderRadius: '10px', filter: 'grayscale(100%)', height: '300px', width: '200px' },
//         { border: '2px solid #01e281', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '300px', width: '200px' },
//         { border: '3px dashed #ff6347', borderRadius: '5px', transform: 'rotate(2deg)', height: '300px', width: '200px' },
//         { border: '1px solid #0000ff', borderRadius: '20px', opacity: 0.9, height: '300px', width: '200px' }
//     ];

//     return (
//         <div
//             className='grid'
//             style={{
//                 backgroundImage: 'url(https://res.cloudinary.com/ddctt6pye/image/upload/v1731483249/vdgjugdz5rhcewmahy62.jpg)', // Replace with your background image URL
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 backdropFilter: 'blur(100px)',
//                 padding: '20px',
//                 margin: '100px auto',
//                 marginLeft: '300px',
//                 borderRadius: '15px',
//                 maxWidth: 'calc(100% - 600px)',
//             }}
//         >
//             <Container className="my-5">
//                 <h2 className="text-center mb-4 fw-bold py-1">
//                     Our <span style={{ color: '#01e281' }}>Advertisements</span>
//                 </h2>
//                 <Row>
//                     {images.map((image, index) => (
//                         <Col xs={12} sm={6} md={3} className="mb-4" key={index}>
//                             <Image
//                                 src={image}
//                                 alt={`Ad ${index + 1}`}
//                                 fluid
//                                 rounded
//                                 className="shadow-sm"
//                                 style={imageStyles[index % imageStyles.length]}
//                             />
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default AdvertisementGallery;


// import React, { useState } from 'react';
// import { Container, Row, Col, Image } from 'react-bootstrap';

// const AdvertisementGallery = () => {
//     // Replace these URLs with your advertisement image URLs
//     const images = [
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/ngdvaokmlds6zu43rhcy.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/v2dahabr0loez7ss9yro.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/xykkhjmxa4qgwfuj5ht2.jpg',
//         'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/nmitz2satybqqcwkonyv.jpg'
//     ];

//     // Styles for each card container
//     const cardStyles = [
//         { backgroundColor: '#FF4D4D', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#fff', height: '250px' },
//         { backgroundColor: '#66FF99', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#000', height: '250px' },
//         { backgroundColor: '#004466', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#fff', height: '250px' },
//         { backgroundColor: '#33CC99', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#000', height: '250px' }
//     ];

//     return (

//         <section
//             style={{
//                 backgroundColor: '#e2e8f0',
//                 height: "100vh",
//             }}
//         >

//             <div
//                 className='grid'
//                 style={{
//                     backgroundImage: 'url(https://res.cloudinary.com/ddctt6pye/image/upload/v1731483249/vdgjugdz5rhcewmahy62.jpg)', // Replace with your background image URL
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                     backdropFilter: 'blur(100px)',
//                     padding: '20px',
//                     margin: ' auto',
//                     marginLeft: '200px',
//                     borderRadius: '15px',
//                     maxWidth: 'calc(100% - 400px)',
//                     maxHeight: '700px',
//                     alignItems:'center'
//                 }}
//             >
//                 <Container className="my-5">
//                     <Row>
//                         {images.map((image, index) => (
//                             <Col xs={12} sm={6} md={3} className="mb-4" key={index}>
//                                 <div style={cardStyles[index % cardStyles.length]}>
//                                     <h4>30% OFF</h4>
//                                     <h5>Special Offer</h5>
//                                     <Image
//                                         src={image}
//                                         alt={`Ad ${index + 1}`}
//                                         fluid
//                                         style={{ borderRadius: '10px', maxHeight: '200px', maxWidth: '100%' }}
//                                     />
//                                 </div>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Container>
//             </div>
//         </section>
//     );
// };

// export default AdvertisementGallery;



import React from 'react';
import { Container, Row, Col, Image, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from 'react-router-dom';

const AdvertisementGallery = () => {
    // Replace these URLs with your advertisement image URLs
    const images = [
        'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/ngdvaokmlds6zu43rhcy.jpg',
        'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/v2dahabr0loez7ss9yro.jpg',
        'https://res.cloudinary.com/ddctt6pye/image/upload/v1731480746/xykkhjmxa4qgwfuj5ht2.jpg',
        'https://res.cloudinary.com/ddctt6pye/image/upload/v1731731938/zrmzfd55nxkx3qjulk16.jpg'
    ];

    // Styles for each card container
    const cardStyles = [
        { backgroundColor: '#FF4D4D', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#fff', height: '250px' },
        { backgroundColor: '#66FF99', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#000', height: '250px' },
        { backgroundColor: '#004466', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#fff', height: '250px' },
        { backgroundColor: '#33CC99', borderRadius: '15px', padding: '20px', textAlign: 'center', color: '#000', height: '250px' }
    ];

    // const handleShopNowClick = () => {
    //     const productSection = document.getElementById('Products');
    //     if (productSection) {
    //     //   productSection.scrollIntoView({ behavior: 'smooth' });
    //     Navigate('/all-products')
    //     }
    //   };

    return (
        <section
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e2e8f0', // Light overlay effect
            }}
        >
            <div
                style={{
                    padding: '20px',
                    borderRadius: '15px',
                    width: '1200px',
                    height: '400px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.9)'
                }}
            >
                <Container>
                    <Row>
                        {images.map((image, index) => (
                            <Col xs={12} sm={6} md={3} className="mb-4" key={index}>
                                <div style={cardStyles[index % cardStyles.length]}>
                                    <h4>30% OFF</h4>
                                    <h5>Special Offer</h5>
                                    <Image
                                        src={image}
                                        alt={`Ad ${index + 1}`}
                                        fluid
                                        style={{ borderRadius: '10px', maxHeight: '250px', maxWidth: '100%' }}
                                    />
                                </div>

                                <div className="d-flex justify-content-center" style={{ marginTop: '70px' }}>
                                    <Link to= '/all-products'>
                                    <Button
                                        style={{
                                            color: 'white',
                                            backgroundColor: '#082f49',
                                            fontWeight: 'bold',
                                            border: "none",
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#01e281';
                                            e.target.style.color = '#082f49';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#082f49';
                                            e.target.style.color = 'white';
                                        }}
                                        // onClick={handleShopNowClick}
                                    >
                                        Buy Now
                                    </Button>
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default AdvertisementGallery;

