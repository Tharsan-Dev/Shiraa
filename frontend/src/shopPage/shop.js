import React from 'react';
import ShopHomePage from '../components/shopPage.js/shopViewPage'
import { NavigationBar } from '../components/home/navbar';
import ProductPage from '../components/home/productPage';
import ShopProductPage from '../components/home/shopProductPage';

export default function shop() {
  return (
    <div>
        
        
        <ShopHomePage/>
        <ShopProductPage/>
        {/* <ProductPage/> */}
        
    </div>
  )
}
