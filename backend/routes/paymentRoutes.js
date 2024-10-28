import express from 'express';
import {  makePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Route to create payment intent
router.post('/create-payment-intent',makePayment);

export default router;
