import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Pagination, Alert, Container, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Search, Edit, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ShopListTable = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // Function to get JWT token from cookies or local storage
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Fetch shops data from the backend
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const jwtToken = getCookie("jwt"); // Retrieve the JWT token from cookies
        const response = await fetch('http://localhost:5000/api/shops/getAllShops', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Attach the token in the request headers
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }

        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter shops based on search term
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate shops
  const indexOfLastShop = currentPage * itemsPerPage;
  const indexOfFirstShop = indexOfLastShop - itemsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  const handleEdit = (id) => {
    console.log(`Edit shop with id: ${id}`);
    // Implement edit functionality
  };

  const handleDeactivate = (id) => {
    console.log(`Deactivate shop with id: ${id}`);
    // Implement deactivate functionality
  };

  return (
    <main>
    
      <Container>
        <h1 className="text-center mb-4"></h1>
        {/* shop list */}
        <div className="space mb-4"></div>
  
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
  
        {/* Search Input */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Search shops </InputGroup.Text>
          <FormControl
            placeholder="Search shops"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <Button variant="outline-secondary" onClick={handleSearch}>
            Search
          </Button> */}
        </InputGroup>
  
        {/* Shops Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Number of Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentShops.map((shop) => (
              <tr key={shop._id}>
                <td>{shop.name}</td>
                <td>{shop.owner}</td>
                <td>{shop.location}</td>
                <td>{shop.products}</td>
                <td>
                  <span className={`badge ${shop.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {shop.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline-secondary" onClick={() => handleEdit(shop._id)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeactivate(shop._id)} className="ms-2">
                    Deactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        {/* Pagination */}
        <div className="d-flex justify-content-between mt-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Container>
    </main>
  );
};  

export default ShopListTable;
