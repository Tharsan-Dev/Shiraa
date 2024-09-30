import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Hero } from '../components/home/hero';
import Features from '../components/home/features';
import Subscription from '../components/home/subscription';
import CustomerFeedbacks from '../components/home/customerFeedbacks';
import Footer from "../components/home/Footer";
import { NavigationBar } from '../components/home/navbar';
import ProductPage from '../components/home/productPage';


export default function ShiraaLandingPage() {


  return (
    <div>
      {/* Header */}
      <NavigationBar/>
      {/* Hero Section */}
      <Hero/>
      {/* Featured Shops */}
      <Features/>

      < ProductPage/>
      {/* Subscription Packages */}
      <Subscription/>
      {/* Customer Testimonials */}
      <CustomerFeedbacks/>
      {/* Footer */}
      <Footer/>

    </div>
  );
}

