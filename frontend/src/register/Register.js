import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, newUser, { withCredentials: true })
      .then(res => {
        alert('User registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch(err => {
        console.error('Error registering user:', err);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          border: `2px solid #334155`,
        }}
      >
        <h1 style={{ color: '#334155', fontWeight: 'bold', marginBottom: '20px' }}>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: `1px solid #334155`,
              borderRadius: '5px',
              outline: 'none',
              fontSize: '16px',
              color: '#334155'
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: `1px solid #334155`,
              borderRadius: '5px',
              outline: 'none',
              fontSize: '16px',
              color: '#334155'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: `1px solid #334155`,
              borderRadius: '5px',
              outline: 'none',
              fontSize: '16px',
              color: '#334155'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#334155',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
