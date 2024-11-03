// import stripe from '../config/stripe.js';

// export const createPaymentIntent = async (req, res) => {
//   const { totalAmount, currency } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalAmount, // Amount in cents (for example, $10 would be 1000)
//       currency,
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Payment intent creation failed', error: error.message });
//   }
// };



// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create a payment intent
// export const createPaymentIntent = async (req, res) => {
//   const { amount, currency } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Convert to smallest currency unit
//       currency: currency || 'usd',
//       metadata: {
//         userId: req.user._id.toString(), // Include user information for tracking
//       },
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Payment failed', error: error.message });
//   }
// };


import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (req, res) => {
  try {
    const { user, total, orderId } = req.body;

    console.log("user data",user);
    console.log("order data",orderId);
    
    const customer = await stripe.customers.create({
      metadata: {
        orderID: String(orderId),
      },
    });
    console.log("Stripe customer response:", customer);
    
    const line_items = [
      {
        price_data: {
          currency: "lkr",
          product_data: {
            name: 'shiraa',
            images: ["https://res.cloudinary.com/ddctt6pye/image/upload/v1730032160/t5czmyugygshax503iz7.jpg"],
          },
          unit_amount: total * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/Cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ error: 'An error occurred during payment processing.' });
  }
};


export default router;
