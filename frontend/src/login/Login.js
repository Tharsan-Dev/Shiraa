import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie'; // Import the js-cookie library
import './Login.css'; // Import the CSS file
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
      },{withCredentials:true});// front end cookie allowing
      const userData = res.data;

      // console.log(res.data);

      localStorage.setItem('user', JSON.stringify(res.data));

      alert('Login successful');

      // window.location.href = '/Login';

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
    
    <div className="login-container mx-auto">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p> Don't have an account? </p><a href="/register">Register here</a>
      
    </div>
  );
};

export default Login;