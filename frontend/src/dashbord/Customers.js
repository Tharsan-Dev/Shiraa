
import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Badge, Button, Form, Modal } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
const YourComponent = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(""); // For role selection
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // For editing user data
  const [editedRole, setEditedRole] = useState(""); // Role edit
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if  (!user || user.role !== "admin") {
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
            credentials: "include", // Include cookies in the request
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          
          // Ensure result is an array before setting it to data
          if (Array.isArray(result)) {
            setData(result);
          } else {
            console.error("API did not return an array:", result); // Log for debugging
            setData([]); // Set data to an empty array if result is not an array
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

  // Role Update Handler
  const submitHandler = async (e, id) => {
    e.preventDefault();

    try {
      const jwtToken = getCookie("jwt");

      const response = await fetch(`http://localhost:5000/api/users/updateRole/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ role }), // Sending selected role to update
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Refresh data after updating the role
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result); // Ensure result is an array before setting it to data
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit user function
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedRole(user.role); // Set the current role for editing
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
        body: JSON.stringify({ role: editedRole }), // Update with edited role
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Refresh data after updating
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result); // Ensure result is an array before setting it to data
      }
      setShowEditModal(false); // Close modal after saving
    } catch (error) {
      setError(error.message);
    }
  };

  // Deactivate user function (backend logic required)
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

      if (!response.ok) {
        throw new Error("Failed to deactivate user");
      }

      // Refresh data after deactivating the user
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result); // Ensure result is an array before setting it to data
      }
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
  
      if (!response.ok) {
        throw new Error("Failed to activate user");
      }
  
      // Assuming backend sends updated user data or user list
      const result = await response.json();
      
      if (Array.isArray(result)) {
        setData(result); // Update the UI with the new user data
      } else {
        console.warn("Unexpected response format: ", result);
      }
      
    } catch (error) {
      console.error("Error activating user: ", error.message);
      setError(error.message); // Set the error state for displaying the error in the UI
    }
  };
  

  return (
    <main>
      <Container className="">
        <div className="space"></div>

        {/* Loading Spinner */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* User Table */}
        {!loading && !error && (
          <Table striped bordered hover responsive className="table-sm table-dark">
            <thead className="text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{user._id}</td>
                  <td className="fw-bold">{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-info text-decoration-none">
                      {user.email}
                    </a>
                  </td>
                  {/* <td>
                    {user.role === "admin" ? (
                      <Badge pill bg="success" className="d-flex align-items-center">
                        <FaCheckCircle className="me-2" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge pill bg="danger" className="d-flex align-items-center">
                        <FaTimesCircle className="me-2" />
                        Not Admin
                      </Badge>
                    )}
                  </td> */}
                  <td>
                    {user.role}
                  </td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>{" "}
                    <Button 
                      variant={user.isActive ? "danger" : "success"} 
                      size="sm" 
                      onClick={() => user.isActive ? handleDeactivate(user._id) : handleActivate(user._id)}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Edit Modal */}
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
                  <option value="shopOwner">shopOwner</option>
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
