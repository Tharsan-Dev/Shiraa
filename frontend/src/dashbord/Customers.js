import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
  Badge,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoleBadge = ({ role }) => {
  const badgeStyle = {
    admin: { backgroundColor: '#28a745', color: 'white' },
    customer: { backgroundColor: '#007bff', color: 'white' },
    shopOwner: { backgroundColor: '#ffc107', color: 'black' },

  };
  return <Badge style={badgeStyle[role] || badgeStyle.default}>{role}</Badge>;
};

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedRole, setEditedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const jwtToken = getCookie("jwt");
          const response = await fetch("http://localhost:5000/api/users/allUsers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            credentials: "include",
          });

          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

          const result = await response.json();
          if (Array.isArray(result)) {
            setData(result);
            setTotalPages(Math.ceil(result.length / 10));
          } else {
            console.error("API did not return an array:", result);
            setData([]);
          }
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [data]);

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedRole(user.role);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch(`http://localhost:5000/api/users/updateRole/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ role: editedRole }),
      });

      if (!response.ok) throw new Error("Failed to update role");

      const result = await response.json();
      if (Array.isArray(result)) setData(result);
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch(`http://localhost:5000/api/users/deactivateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to deactivate user");

      const result = await response.json();
      if (Array.isArray(result)) setData(result);
      setShowDeleteAlert(true);
      setTimeout(() => setShowDeleteAlert(false), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleActivate = async (id) => {
    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch(`http://localhost:5000/api/users/activateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to activate user");

      const result = await response.json();
      if (Array.isArray(result)) setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <Container>
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        {showDeleteAlert && <Alert variant="success">User deactivated successfully!</Alert>}

        <InputGroup className="mb-3">
          <InputGroup.Text>Search</InputGroup.Text>
          <FormControl
            placeholder="Search users by name or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {!loading && !error && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{user._id}</td>
                  <td className="fw-bold">{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-info text-decoration-none">
                      {user.email}
                    </a>
                  </td>
                  <td>
                    <RoleBadge role={user.role} />
                  </td>
                  <td>
                    <Button variant="outline-secondary" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant={user.isActive ? "outline-danger" : "outline-success"}
                      onClick={() => (user.isActive ? handleDeactivate(user._id) : handleActivate(user._id))}
                      className="ms-2"
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={editedRole}
                  onChange={(e) => setEditedRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="shopOwner">Shop Owner</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default YourComponent;
