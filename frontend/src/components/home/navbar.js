// // import React, { useEffect, useState } from 'react';
// // import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// // import { BsList, BsX } from 'react-icons/bs';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import axios from 'axios';

// // export const NavigationBar = () => {
// //     const [isMenuOpen, setIsMenuOpen] = useState(false);
// //     const [role, setRole] = useState();

// //     useEffect(() => {
// //         const items = JSON.parse(localStorage.getItem('user'));
// //         if (items) {
// //             setRole(items.role);
// //         }
// //     }, []);
// //     const handleLogOut =  async () =>{
// //         try {
// //             const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {},{withCredentials:true});// front end cookie delecting
            
      
// //             localStorage.removeItem('user');
      
// //             alert('Logout successful');
      
// //            window.location.reload(true)
      
           
// //           } catch (err) {
            
// //           }
        
        
// //     }

// //     return (
// //         <>
// //             <BootstrapNavbar bg="black" className="shadow-sm text-white h-fit py-0">
// //                 <Container>
// //                     <BootstrapNavbar.Brand href="#">
// //                         <img src="" alt="Shiraa Logo" width="100" height="40" />
// //                     </BootstrapNavbar.Brand>
// //                     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //                         {isMenuOpen ? <BsX /> : <BsList />}
// //                     </BootstrapNavbar.Toggle>
// //                     <BootstrapNavbar.Collapse>
// //                         <Nav className="ms-auto text-white">
// //                             {['Home', 'Shops','Products' ,'Packages','About Us', 'Contact'].map((item) => {
// //                                 const formattedItem = item.replace(/\s+/g, '-'); // Replace spaces with hyphens
// //                                 return (
// //                                     <Nav.Link 
// //                                         href={`#${formattedItem}`} 
// //                                         key={item} 
// //                                         className="text-white text-decoration-none" // Add this class to make the text white
// //                                     >
// //                                         {item}
// //                                     </Nav.Link>
// //                                 );
// //                             })}
// //                         </Nav>
// //                         {role ? (
// //                             <Button onClick={handleLogOut} variant="primary" size="sm">
// //                                 Logout
// //                             </Button>
// //                         ) : (
// //                             <Button href="/login" variant="primary" size="sm">
// //                                 Login
// //                             </Button>
// //                         )}
// //                         <Button href="/ShopRegister" variant="primary" size="sm" style={{ marginLeft: '20px' }}>
// //                                 OwnStore
// //                             </Button>
// //                     </BootstrapNavbar.Collapse>
// //                 </Container>
// //             </BootstrapNavbar>
// //         </>
// //     );
// // };


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


import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { BsList, BsX } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null); // Initialize as null for better type checking

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRole(user.role); // Set user role if available
        }
    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/logoutuser`, {}, { withCredentials: true });
            localStorage.removeItem('user'); // Remove user from local storage
            alert('Logout successful');
            window.location.reload(true); // Reload the page to reflect the change
        } catch (err) {
            console.error(err); // Handle error appropriately
        }
    };

    return (
        <>
            <BootstrapNavbar bg="black" className="shadow-sm text-white h-fit py-0">
                <Container>
                    <BootstrapNavbar.Brand href="#">
                        <img src="" alt="Shiraa Logo" width="100" height="40" />
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <BsX /> : <BsList />}
                    </BootstrapNavbar.Toggle>
                    <BootstrapNavbar.Collapse>
                        <Nav className="ms-auto text-white">
                            <Nav.Link href="/" className="text-white text-decoration-none">Home</Nav.Link> {/* Modified to navigate to "/" */}
                            {['Shops', 'Products', 'Packages', 'About Us', 'Contact'].map((item) => {
                                const formattedItem = item.replace(/\s+/g, '-'); // Replace spaces with hyphens
                                return (
                                    <Nav.Link 
                                        href={`#${formattedItem}`} 
                                        key={item} 
                                        className="text-white text-decoration-none"
                                    >
                                        {item}
                                    </Nav.Link>
                                );
                            })}
                        </Nav>

                        {/* Conditionally render the "OwnStore" button based on user's role */}
                        {role && (
                            <Button href="/ShopRegister" variant="primary" size="sm" style={{ marginLeft: '20px' }}>
                                OwnStore
                            </Button>
                        )}

                        {/* Conditionally render the login/logout button */}
                        {role ? (
                            <Button onClick={handleLogOut} variant="primary" size="sm">
                                Logout
                            </Button>
                        ) : (
                            <Button href="/login" variant="primary" size="sm">
                                Login
                            </Button>
                        )}
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        </>
    );
};


