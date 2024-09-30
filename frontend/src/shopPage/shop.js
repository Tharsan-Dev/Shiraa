import React from 'react';
import ShopHomePage from '../components/shopPage.js/shopViewPage'
import { NavigationBar } from '../components/home/navbar';
import ProductPage from '../components/home/productPage';

export default function shop() {
  return (
    <div>
        
        <NavigationBar/>
        <ShopHomePage/>
        <ProductPage/>
        
    </div>
  )
}
