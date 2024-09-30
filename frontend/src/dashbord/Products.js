// import React, { useState, useEffect } from "react";
// import { Table, Button, Container, Alert, Spinner, InputGroup, FormControl } from "react-bootstrap";
// import { Edit, Trash2, Search } from 'lucide-react';

// Mock product data (replace with actual API call)
// const mockProducts = [
//   { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, quantity: 50, status: 'Active' },
//   { id: 2, name: 'Desk Chair', category: 'Furniture', price: 199.99, quantity: 30, status: 'Active' },
//   { id: 3, name: 'Coffee Maker', category: 'Appliances', price: 79.99, quantity: 0, status: 'Inactive' },
//   { id: 4, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, quantity: 100, status: 'Active' },
//   { id: 5, name: 'Bookshelf', category: 'Furniture', price: 149.99, quantity: 20, status: 'Active' },
// ]

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;

//   useEffect(() => {
//     // Simulating API call
//     setTimeout(() => {
//       try {
//         setProducts(mockProducts);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//         setLoading(false);
//       }
//     }, 1500);
//   }, []);

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const handleEdit = (id) => {
//     console.log(`Edit product with id: ${id}`);
//   };

//   const handleDelete = (id) => {
//     console.log(`Delete product with id: ${id}`);
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//         <Spinner animation="border" role="status" variant="primary">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   return (
//     <main>
//       <Container>
//         <h1 className="text-center mb-4">Product List</h1>

//         {error && <Alert variant="danger">{error}</Alert>}

//         <InputGroup className="mb-4">
//           <InputGroup.Text>
//             <Search />
//           </InputGroup.Text>
//           <FormControl
//             type="text"
//             placeholder="Search products by name or category"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>

//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.name}</td>
//                 <td>{product.category}</td>
//                 <td>${product.price.toFixed(2)}</td>
//                 <td>{product.quantity}</td>
//                 <td>
//                   <span className={`badge ${
//                     product.status === 'Active' ? 'bg-success' : 'bg-danger'
//                   }`}>
//                     {product.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex">
//                     <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(product.id)}>
//                       <Edit size={16} />
//                     </Button>
//                     <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>
//                       <Trash2 size={16} />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         <div className="d-flex justify-content-between mt-4">
//           <Button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           <span>Page {currentPage} of {totalPages}</span>
//           <Button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </Button>
//         </div>
//       </Container>
//     </main>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert, InputGroup, FormControl, Button } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/view");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleEdit = (id) => {
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete product with id: ${id}`);
  };

  return (
    <main>
      <Container>
        <h1 className="text-center mb-4">Product List</h1>

        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <InputGroup className="mb-3">
          <InputGroup.Text>Search</InputGroup.Text>
          <FormControl
            placeholder="Search products by name or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>Rs.{product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <span className={`badge ${product.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline-secondary" onClick={() => handleEdit(product._id)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(product._id)} className="ms-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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

export default ProductList;
