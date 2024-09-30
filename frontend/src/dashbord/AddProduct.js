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
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('stock', stock);

    // Append multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const jwtToken = getCookie("jwt"); // Retrieve JWT from the cookie
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
    <main>
      <Container>
        <div className="space mb-4"></div>
        <h1 className="text-center mb-4">Add New Product</h1>

        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="category">
            <FormLabel>Category</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="price">
            <FormLabel>Price</FormLabel>
            <FormControl
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="quantity">
            <FormLabel>Quantity</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter product quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="stock">
            <FormLabel>Stock</FormLabel>
            <FormControl
              type="number"
              placeholder="Enter stock amount"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="images">
            <FormLabel>Images</FormLabel>
            <FormControl
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </FormGroup>

          <Button type="submit" variant="primary" className="mt-3">
            Add Product
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default AddProduct;
