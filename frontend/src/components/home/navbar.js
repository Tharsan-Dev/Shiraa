// import React, { useEffect, useState } from 'react';
// import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// import { BsList, BsX } from 'react-icons/bs';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// export const NavigationBar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [role, setRole] = useState();

//     useEffect(() => {
//         const items = JSON.parse(localStorage.getItem('user'));
//         if (items) {
//             setRole(items.role);
//         }
//     }, []);
//     const handleLogOut =  async () =>{
//         try {
//             const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {},{withCredentials:true});// front end cookie delecting


//             localStorage.removeItem('user');

//             alert('Logout successful');

//            window.location.reload(true)


//           } catch (err) {

//           }


//     }

//     return (
//         <>
//             <BootstrapNavbar bg="black" className="shadow-sm text-white h-fit py-0">
//                 <Container>
//                     <BootstrapNavbar.Brand href="#">
//                         <img src="" alt="Shiraa Logo" width="100" height="40" />
//                     </BootstrapNavbar.Brand>
//                     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                         {isMenuOpen ? <BsX /> : <BsList />}
//                     </BootstrapNavbar.Toggle>
//                     <BootstrapNavbar.Collapse>
//                         <Nav className="ms-auto text-white">
//                             {['Home', 'Shops','Products' ,'Packages','About Us', 'Contact'].map((item) => {
//                                 const formattedItem = item.replace(/\s+/g, '-'); // Replace spaces with hyphens
//                                 return (
//                                     <Nav.Link 
//                                         href={`#${formattedItem}`} 
//                                         key={item} 
//                                         className="text-white text-decoration-none" // Add this class to make the text white
//                                     >
//                                         {item}
//                                     </Nav.Link>
//                                 );
//                             })}
//                         </Nav>
//                         {role ? (
//                             <Button onClick={handleLogOut} variant="primary" size="sm">
//                                 Logout
//                             </Button>
//                         ) : (
//                             <Button href="/login" variant="primary" size="sm">
//                                 Login
//                             </Button>
//                         )}
//                         <Button href="/ShopRegister" variant="primary" size="sm" style={{ marginLeft: '20px' }}>
//                                 OwnStore
//                             </Button>
//                     </BootstrapNavbar.Collapse>
//                 </Container>
//             </BootstrapNavbar>
//         </>
//     );
// };


// import React, { useEffect, useState } from 'react';
// import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// import { BsList, BsX } from 'react-icons/bs';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// export const NavigationBar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [role, setRole] = useState(null); // Initialize as null for better type checking

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setRole(user.role); // Set user role if available
//         }
//     }, []);

//     const handleLogOut = async () => {
//         try {
//             await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {}, { withCredentials: true });
//             localStorage.removeItem('user'); // Remove user from local storage
//             alert('Logout successful');
//             window.location.reload(true); // Reload the page to reflect the change
//         } catch (err) {
//             console.error(err); // Handle error appropriately
//         }
//     };

//     return (
//         <>
//             <BootstrapNavbar bg="black" className="shadow-sm text-white h-fit py-0">
//                 <Container>
//                     <BootstrapNavbar.Brand href="#">
//                         <img src="" alt="Shiraa Logo" width="100" height="40" />
//                     </BootstrapNavbar.Brand>
//                     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                         {isMenuOpen ? <BsX /> : <BsList />}
//                     </BootstrapNavbar.Toggle>
//                     <BootstrapNavbar.Collapse>
//                         <Nav className="ms-auto text-white">
//                             {['Home', 'Shops', 'Products', 'Packages', 'About Us', 'Contact'].map((item) => {
//                                 const formattedItem = item.replace(/\s+/g, '-'); // Replace spaces with hyphens
//                                 return (
//                                     <Nav.Link 
//                                         href={`#${formattedItem}`} 
//                                         key={item} 
//                                         className="text-white text-decoration-none"
//                                     >
//                                         {item}
//                                     </Nav.Link>
//                                 );
//                             })}
//                         </Nav>

//                         {/* Conditionally render the "OwnStore" button based on user's role */}
//                         {role && (
//                             <Button href="/ShopRegister" variant="primary" size="sm" style={{ marginLeft: '20px' }}>
//                                 OwnStore
//                             </Button>
//                         )}

//                         {/* Conditionally render the login/logout button */}
//                         {role ? (
//                             <Button onClick={handleLogOut} variant="primary" size="sm">
//                                 Logout
//                             </Button>
//                         ) : (
//                             <Button href="/login" variant="primary" size="sm">
//                                 Login
//                             </Button>
//                         )}
//                     </BootstrapNavbar.Collapse>
//                 </Container>
//             </BootstrapNavbar>
//         </>
//     );
// };


// import React, { useEffect, useState } from 'react';
// import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// import { BsList, BsX } from 'react-icons/bs';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

// export const NavigationBar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [role, setRole] = useState(null); // Initialize as null for better type checking

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setRole(user.role); // Set user role if available
//         }
//     }, []);

//     const handleLogOut = async () => {
//         try {
//             await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {}, { withCredentials: true });
//             localStorage.removeItem('user');
//             localStorage.removeItem('cart')
//             // Remove user from local storage
//             alert('Logout successful');
//             window.location.reload(true); // Reload the page to reflect the change
//         } catch (err) {
//             console.error(err); // Handle error appropriately
//         }
//     };

//     return (
//         <>
//             <BootstrapNavbar  style={{ backgroundColor: "#122d40" }} className="shadow-sm text-white h-fit py-0">
//                 <Container>
//                     <BootstrapNavbar.Brand href="#">
//                         <img src="" alt="Shiraa Logo" width="100" height="40" />
//                     </BootstrapNavbar.Brand>
//                     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                         {isMenuOpen ? <BsX /> : <BsList />}
//                     </BootstrapNavbar.Toggle>
//                     <BootstrapNavbar.Collapse>
//                         <Nav className="ms-auto text-white ">
//                             <Nav.Link href="/" className="text-white text-decoration-none">Home</Nav.Link> {/* Modified to navigate to "/" */}
//                             <Nav.Link href="/cart" className="text-white text-decoration-none">Cart</Nav.Link>
//                             {['Shops', 'Products', 'Packages', 'About Us', 'Contact'].map((item) => {
//                                 const formattedItem = item.replace(/\s+/g, '-'); // Replace spaces with hyphens
//                                 return (
//                                     <Nav.Link 
//                                         href={`#${formattedItem}`} 
//                                         key={item} 
//                                         className="text-white text-decoration-none"
//                                     >
//                                         {item}
//                                     </Nav.Link>
//                                 );
//                             })}
//                    <div className="d-flex justify-content-end align-items-center">
//   {/* Conditionally render the "OwnStore" button based on user's role */}
//   {role && (
//     <Button href="/ShopRegister" style={{ backgroundColor: "#01e281", color:'white' }}  size="sm" className="mr-3">
//       OwnStore
//     </Button>
//   )}

//   {/* Conditionally render the login/logout button */}
//   {role ? (
//     <Button onClick={handleLogOut} style={{ backgroundColor: "#01e281", color:'white' }}  size="sm" className="ml-3">
//       Logout
//     </Button>
//   ) : (
//     <Button href="/login" style={{ backgroundColor: "#01e281", color:'white' }}  size="sm" className="ml-3">
//       Login
//     </Button>
//   )}
// </div>

//                         </Nav>


//                     </BootstrapNavbar.Collapse>
//                 </Container>
//             </BootstrapNavbar>
//         </>
//     );
// };

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button, Container, NavDropdown, Modal } from 'react-bootstrap';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ShopRegisterForm from '../../shopregister/ShopRegister.js';

export const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState('transparent');
    const [userProfile, setUserProfile] = useState(null);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null); // Initialize as null for better type checking

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRole(user.role); // Set user role if available
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBackground('#082f49');
            } else {
                setNavbarBackground('transparent');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);




    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUserProfile(user.profilePicture);
        }
    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {}, { withCredentials: true });
            localStorage.removeItem('user');
            alert('Logout successful');
            window.location.reload(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        // <Navbar expand="lg" style={{ backgroundColor: '#ffffff' }} fixed="top" className="shadow-sm">
        //     <Container>
        //         <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
        //             <img src="https://res.cloudinary.com/ddctt6pye/image/upload/v1727009374/Minimalist_Simple_Fast_Delivery_Logo_3_ecxlsk.png" alt="Shiraa Logo" height="40" style={{ marginRight: '8px' }} />
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="mx-auto">
        //                 <Nav.Link as={Link} to="/" style={{ color: '#6c63ff' }} className="d-flex align-items-center">
        //                     <AiOutlineHome className="me-2" /> Home
        //                 </Nav.Link>
        //                 <Nav.Link as={Link} to="/about" style={{ color: '#6c63ff' }} className="d-flex align-items-center">
        //                     <AiOutlineInfoCircle className="me-2" /> About
        //                 </Nav.Link>
        //                 <Nav.Link as={Link} to="/contact" style={{ color: '#6c63ff' }} className="d-flex align-items-center">
        //                     <AiOutlineMail className="me-2" /> Contact
        //                 </Nav.Link>
        //             </Nav>
        //             <Nav className="ms-auto d-flex align-items-center">
        //                 {(location.pathname === '/' || location.pathname === '/learnmore') ? (
        //                     <Button variant="outline-primary" style={{ borderColor: '#6c63ff', color: '#6c63ff' }} className="me-2">
        //                         <FaCog className="me-2" /> SETUP
        //                     </Button>
        //                 ) : isLoggedIn ? (
        //                     <>
        //                         {userProfile && (
        //                             <img
        //                                 src={userProfile}
        //                                 alt="Profile"
        //                                 height="40"
        //                                 width="40"
        //                                 className="rounded-circle me-2 cursor-pointer"
        //                             />
        //                         )}
        //                         <Button variant="primary" className="me-2" onClick={() => console.log('Navigate to profile')}>
        //                             <AiOutlineUser className="me-2" /> Profile
        //                         </Button>
        //                         <Button variant="danger" onClick={handleLogOut}>
        //                             <AiOutlineLogout className="me-2" /> Logout
        //                         </Button>
        //                     </>
        //                 ) : (
        //                     <Button variant="outline-primary" style={{ borderColor: '#6c63ff', color: '#6c63ff' }} className="me-2">
        //                         <FaCog className="me-2" /> SETUP
        //                     </Button>
        //                 )}
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>

        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                //   style={{ background: navbarBackground }}
                style={{ background: "#082f49" }}
                className="rounded mx-5 fixed-top"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="https://res.cloudinary.com/ddctt6pye/image/upload/v1727009374/Minimalist_Simple_Fast_Delivery_Logo_3_ecxlsk.png"
                            alt="Shiraa Logo"
                            height="40"
                            style={{ marginRight: '8px' }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link
                                href="/"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="/cart"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Cart
                            </Nav.Link>
                            <Nav.Link
                                href="/#Shops"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Shops
                            </Nav.Link>

                            <Nav.Link
                                href="/#Products"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Products
                            </Nav.Link>
                            <Nav.Link
                                href="/#Packages"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Packages
                            </Nav.Link>
                            {['About Us'].map((item) => {
                                const formattedItem = item.replace(/\s+/g, '-');
                                return (
                                    <Nav.Link
                                        href={`#${formattedItem}`}
                                        key={item}
                                        style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                        onMouseOver={(e) => (e.target.style.color = '#4ade80')}
                                        onMouseOut={(e) => (e.target.style.color = 'white')}
                                    >
                                        {item}
                                    </Nav.Link>
                                );
                            })}
                            {role && (
                                <Nav.Link href='/ShopRegister' className="text-decoration-none">
                                    <Button size="sm" style={{ color: 'white', background: '#01e281', fontWeight: 'bold' }}>OwnStore</Button>
                                </Nav.Link>
                            )}
                            {role ? (
                                <Nav.Link>
                                    <Button onClick={handleLogOut} size="sm" className="ml-3 h-5" style={{ color: 'white', background: '#01e281', fontWeight: 'bold' }}>
                                        Logout
                                    </Button>
                                </Nav.Link>
                            ) : (
                                <Nav.Link href="/login" className="text-decoration-none">
                                    <Button size="sm" variant="success" style={{ color: 'white', background: '#01e281', fontWeight: 'bold' }}>
                                        Login
                                    </Button>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for Shop Register Form */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register Your Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Test Content</p>

                   <div><ShopRegisterForm /></div>  {/* Display the separate ShopRegisterForm component here */}

                </Modal.Body>
            </Modal>
        </>
    );

};