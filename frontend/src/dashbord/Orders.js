// import React, { useEffect, useState } from "react";
// import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const OrdersTable = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const jwtToken = getCookie("jwt");
//         const response = await fetch("http://localhost:5000/api/orders/allorders", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${jwtToken}`,
//           },
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         setOrders(result);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Pagination logic
//   const indexOfLastOrder = currentPage * itemsPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(orders.length / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <Container>
//       {/* <h3 className="mt-4">Order Details</h3> */}

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//           <Spinner animation="border" role="status" variant="primary">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}

//       {/* Error Alert */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Orders Table */}
//       {!loading && !error && (
//         <>
//           <Table striped bordered hover responsive className="table-sm mt-4">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>User</th>
//                 {/* <th>Shop</th> */}
//                 <th>Total Amount</th>
//                 <th>Delivery Address</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentOrders.map((order) => (
//                 <tr key={order._id} className="align-middle">
//                   <td>{order._id}</td>
//                   <td>{order.user ? order.user.name : 'N/A'}</td>
//                   {/* <td>{order.shop ? order.shop.name : 'N/A'}</td> */}
//                   <td>{order.totalAmount}</td>
//                   <td>
//                     {order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city}` : 'N/A'}
//                   </td>
//                   <td>
//                     <span
//                       style={{
//                         backgroundColor: order.paymentStatus === 'pending' ? '#777' : '#22c55e',
//                         color: 'black',
//                         padding: '5px 10px',
//                         borderRadius: '5px',
//                         display: 'inline-block',
//                       }}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <Button variant="outline-info" size="sm">View Details</Button>{" "}
//                     <Button variant="outline-danger" size="sm">Delete</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {/* Pagination Controls */}
//           <div className="d-flex justify-content-between mt-3">
//             <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
//             <span>Page {currentPage} of {totalPages}</span>
//             <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// export default OrdersTable;



import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const jwtToken = getCookie("jwt");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/allorders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setOrders(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/deleteorders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.status}`);
      }

      // Update the state to remove the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container>
      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Orders Table */}
      {!loading && !error && (
        <>
          <Table striped bordered hover responsive className="table-sm mt-4">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total Amount</th>
                <th>Delivery Address</th>
                <th>Status</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="align-middle">
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : 'N/A'}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    {order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city}` : 'N/A'}
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: order.paymentStatus === 'pending' ? '#777' : '#22c55e',
                        color: 'black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        display: 'inline-block',
                      }}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  {/* <td>
                    <Button variant="outline-info" size="sm">View Details</Button>{" "}
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default OrdersTable;
