import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Pagination, Alert, Container, Spinner } from 'react-bootstrap';
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
        <div className="space mb-4"></div>
        <h1 className="text-center mb-4">Shop List</h1>

        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3" controlId="searchShops">
          <Form.Label>Search shops by name or location</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-secondary">
              <Search className="me-1" />
              Search
            </Button>
          </div>
        </Form.Group>

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
                  <div className="d-flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleEdit(shop._id)}>
                      <Edit className="me-1" />
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeactivate(shop._id)}>
                      <XCircle className="me-1" />
                      Deactivate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted">
            Showing {indexOfFirstShop + 1} to {Math.min(indexOfLastShop, filteredShops.length)} of {filteredShops.length} shops
          </p>

          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Pagination.Prev>
            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </Pagination.Next>
          </Pagination>
        </div>
      </Container>
    </main>
  );
};

export default ShopListTable;
