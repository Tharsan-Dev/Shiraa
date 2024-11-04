import React, { useState } from "react";
import { Form, Button, Container, FormGroup, FormLabel, FormControl, Spinner, Alert } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("stock", stock);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const jwtToken = getCookie("jwt");
      const response = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess("Product added successfully!");
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <main style={{ backgroundColor: "#f8f9fa", padding: "3rem", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        marginTop: '80px',
        marginBottom: '5px',
        padding: "2rem",
        maxWidth: "500px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        border: `2px solid #334155`,
      }}>
        <h1 className="text-center mb-4" style={{ color: "#334155", fontWeight: "bold" }}>Add New Product</h1>

        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger" style={{ textAlign: "center" }}>{error}</Alert>}
        {success && <Alert variant="success" style={{ textAlign: "center" }}>{success}</Alert>}

        <Form onSubmit={submitHandler} style={{ marginTop: "20px" }}>
          <FormGroup controlId="name">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ border: "1px solid #334155" }}
            />
          </FormGroup>

          <FormGroup controlId="category">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Category</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ border: "1px solid #334155" }}
            />
          </FormGroup>

          <FormGroup controlId="price">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Price</FormLabel>
            <FormControl
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ border: "1px solid #334155" }}
            />
          </FormGroup>

          <FormGroup controlId="quantity">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Quantity</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ border: "1px solid #334155" }}
            />
          </FormGroup>

          <FormGroup controlId="stock">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Stock</FormLabel>
            <FormControl
              type="number"
              placeholder="Enter stock amount"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={{ border: "1px solid #334155" }}
            />
          </FormGroup>

          <FormGroup controlId="images">
            <FormLabel style={{ fontWeight: "bold", color: "#334155" }}>Images</FormLabel>
            <FormControl
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ border: "1px solid #334155", padding: "5px" }}
            />
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            style={{
              backgroundColor: "#334155",
              borderColor: "#334155",
              width: "100%",
              padding: "10px",
              fontWeight: "bold"
            }}
          >
            Add Product
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default AddProduct;
