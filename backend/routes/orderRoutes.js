import express from 'express';
import { createOrder, getUserOrders, getShopOrders,getAllOrders, deleteOrder } from '../controllers/orderController.js';
import { protect,checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Order-related routes
router.post('/create', protect,createOrder); // Create a new order (authenticated users)
router.get('/myorders', protect, getUserOrders); // Get user's orders
router.get('/shop/:shopId/orders', protect, getShopOrders);
router.get('/allorders',protect,getAllOrders) ;
router.get('/deleteorders/:id',protect,checkRole(['admin']),deleteOrder) ;



export default router;
