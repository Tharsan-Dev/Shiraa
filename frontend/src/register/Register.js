import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a user object with all the form data
    const newUser = {
      name,
      email,
      password,
     
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, newUser, { withCredentials: true })
    .then(res => {
      alert('User registered successfully!');
      
      // Clear the form after success
      setName('');
      setEmail('');
      setPassword('');
      
      const userData = res.data;
      console.log(userData);
  
      // Save the user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
  
      // Redirect to home page for regular users
      navigate('/'); 
    })
    .catch(err => {
      console.error('Error registering user:', err);
    });
  
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* <div className="role-selection">
          <h3>Select your role:</h3>
          <label>
            <input
              type="radio"
              name="role"
              value="deliveryman"
              checked={role === 'deliveryman'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            DeliveryMan
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="shops"
              checked={role === 'shops'}
              onChange={(e) => setRole(e.target.value)}
            />
            Shops
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === 'customer'}
              onChange={(e) => setRole(e.target.value)}
            />
            Customers
          </label>
        </div> */}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;