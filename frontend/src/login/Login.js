import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie'; // Import the js-cookie library
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        email,
        password,
      },{withCredentials:true});// front end cookie allowing
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Login successful');
      window.location.href = '/Login';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
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