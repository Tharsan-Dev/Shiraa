// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from '../src/login/Login';
// import Register from "./register/Register";
// import Addproduct from './dashbord/AddProduct';
// import Dashboard from '../src/dashbord/Dashbord';
// import MainLayout from './components/MainLayout';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline'



// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
// })

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//     <Router>
//       {/* <div className="App"> */}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/home" element={<Home />} /> */}
//           {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
//            <Route path="/admin" element={<MainLayout />}>
//            <Route path="/admin/dashbord" element={<Dashboard />} />
//            <Route path="product" element={<Addproduct />} />
//           </Route>

//         </Routes>
//       {/* </div> */}
//     </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/login/Login';
import Register from './register/Register';
import Dashboard from '../src/dashbord/Dashbord';
import MainLayout from './components/MainLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Customers from './dashbord/Customers';
import HomePage from './homePage/home';
import Shop from '../src/shopPage/shop'
import ShopRegisterForm from './components/home/ShopRegister';
import ShopListTable from './dashbord/Shops';
import AddProduct from './dashbord/AddProduct';
import ProductList from './dashbord/Products';
import CartPage from './components/cart/CartPage';
import OrderConfirmationPage from './components/order/order';
import CreateProduct from './addProductPage/addproduct';
// import NavigationBar from '../src/components/home/navbar';
import { NavigationBar } from './components/home/navbar';
import Footer from './components/home/Footer';
import OrdersTable from './dashbord/Orders';
import AllProductPage from './components/home/allProductPage';
import AllShopsPage from './components/home/allShops';



const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<  HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopview" element={< Shop/>} />
          <Route path="/shopview/:shopId" element={< Shop/>} />
          <Route path="/ShopRegister" element={< ShopRegisterForm/>} />

          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/order-confirmation" element={<OrderConfirmationPage/>} />
          <Route path="/createproduct" element={<CreateProduct/>}/>
          <Route path="/all-products" element={<AllProductPage/>}/>
          <Route path="/all-shops" element={<AllShopsPage/>}/>

          

          


          {/* Nested routes under /admin */}
          <Route path="/admin" element={<MainLayout />}>
            {/* Dashboard will load as the default component for /admin */}
        
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customer" element={<Customers />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="shops" element={<ShopListTable />} />
            <Route path="list-product" element={< ProductList/>} />
            <Route path='orders'element={<OrdersTable/>}/>
          </Route>

          {/* Redirect to login if no route matches */}
          {/* //404 */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
