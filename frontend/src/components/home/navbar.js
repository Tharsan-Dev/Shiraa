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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container, NavDropdown, Modal } from 'react-bootstrap';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail, AiOutlineUser, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ShopRegisterForm from './ShopRegister';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState('transparent');
    const [userProfile, setUserProfile] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleLogoClick = () => {
        navigate(role === 'admin' ? '/admin/customer' : '/');
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRole(user.role);
            setIsLoggedIn(true);
            setUserProfile(user.profilePicture);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setNavbarBackground(window.scrollY > 50 ? '#082f49' : 'transparent');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {}, { withCredentials: true });
            localStorage.removeItem('user');

            // Display the logout notification
            toast.error('Logout successful', {
                onClose: () => {
                    // Delay before reloading the page to allow the notification to show
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000); // Adjust the delay as needed (in milliseconds)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
            />
            <Navbar
                collapseOnSelect
                expand="lg"
                //   style={{ background: navbarBackground }}
                style={{ background: "#082f49" }}
                className="rounded mx-5 fixed-top"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{
                        display:'flex',
                        width: '80px',
                        height: '40px',
                    }}
                        onClick={handleLogoClick}>
                        <img
                            src="https://res.cloudinary.com/ddctt6pye/image/upload/v1731245261/nxbjgbl4xh6twrjxbwt6.svg"
                            alt="Shiraa Logo"
                            width= '120px'
                            height= '120px'
                            

                        style={{marginTop:'-45px',marginLeft:'-10px'}}/>
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
                            {/* <Nav.Link
                                href="/#Packages"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                Packages
                            </Nav.Link> */}
                            <Nav.Link
                                href="/#About-Us"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#4ade80')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                About us
                            </Nav.Link>
                            <Nav.Link
                                href="/cart"
                                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                                onMouseOver={(e) => (e.target.style.color = '#01e281')}
                                onMouseOut={(e) => (e.target.style.color = 'white')}
                            >
                                <AiOutlineShoppingCart style={{ fontSize: '25px' }} />
                            </Nav.Link>


                            {role && (
                                <Nav.Link onClick={handleOpenModal} className="text-decoration-none text-muted">
                                    <Button size="sm"
                                        style={{
                                            color: 'white',
                                            background: '#01e281',
                                            fontWeight: 'bold',
                                            border: 'none'
                                        }}
                                        onMouseOver={(e) => (e.target.style.color = '#082f49')}
                                        onMouseOut={(e) => (e.target.style.color = 'white')}
                                    >OwnStore
                                    </Button>
                                </Nav.Link>
                            )}
                            {role ? (
                                <Nav.Link>
                                    <Button onClick={handleLogOut}
                                        size="sm"
                                        className="ml-3 h-5"
                                        style={{ color: 'white', background: '#01e281', fontWeight: 'bold', border: 'none' }}
                                        onMouseOver={(e) => (e.target.style.color = '#082f49')}
                                        onMouseOut={(e) => (e.target.style.color = 'white')}

                                    >
                                        Logout
                                    </Button>
                                </Nav.Link>
                            ) : (
                                <Nav.Link href="/login" className="text-decoration-none">
                                    <Button size="sm"
                                        variant="success"
                                        style={{ color: 'white', background: '#01e281', fontWeight: 'bold' }}
                                        onMouseOver={(e) => (e.target.style.color = '#082f49')}
                                        onMouseOut={(e) => (e.target.style.color = 'white')}
                                    >
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

                </Modal.Header>
                <Modal.Body>
                    <div><ShopRegisterForm /></div>  {/* Display the separate ShopRegisterForm component here */}
                </Modal.Body>
            </Modal>
        </>
    );

};