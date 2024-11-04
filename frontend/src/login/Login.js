import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        email,
        password,
      },{withCredentials: true}); // front end cookie allowing

      const userData = res.data;
      localStorage.setItem('user', JSON.stringify(res.data));

      alert('Login successful');

      if (userData.role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/'); // Redirect to home page for regular users
      }
    } catch (err) {
      setError('Invalid credentials');
    }
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
        className="login-container"
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
        <h2 style={{ color: '#334155', fontWeight: 'bold', marginBottom: '20px' }}>Login</h2>
        {error && (
          <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>{error}</p>
        )}
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p style={{ marginTop: '15px', color: '#334155' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#01e281', textDecoration: 'none', fontWeight: 'bold' }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
