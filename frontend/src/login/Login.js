import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        { email, password },
        { withCredentials: true } // Front end cookie allowing
      );

      const userData = res.data;
      localStorage.setItem('user', JSON.stringify(userData));

      // Success notification
      toast.success('Login successful!', {
        onClose: () => {
          // Navigate after a short delay to allow the user to see the notification
          setTimeout(() => {
            if (userData.role === 'admin') {
              navigate('/admin/customer'); // Redirect to admin dashboard
            } else {
              navigate('/'); // Redirect to home page for regular users
            }
          }, 1000); // Adjust the delay as needed (in milliseconds)
        },
      });
    } catch (err) {
      setError('Invalid credentials');
      // Error notification
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className='d-flex  align-items-center justify-content-center' style={{border: `2px solid #01e281`,}}>
      <div > 
        <h1>Welcome back to Shiraa </h1>
        <img>

        </img>
      </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

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
              color: '#334155',
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
              color: '#334155',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#01e281',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
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
    </div>
  );
};

export default Login;
