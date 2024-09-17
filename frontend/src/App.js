import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/login/Login';
import Register from "./register/Register";
import Addproduct from './dashbord/AddProduct';
import Dashboard from '../src/dashbord/Dashbord';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          <Route path="/admin" element={<MainLayout />}>
           <Route path="/admin/dashbord" element={<Dashboard />} />
           <Route path="product" element={<Addproduct />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;