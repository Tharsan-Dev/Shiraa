import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shopsRoutes from "./routes/shopsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/paymentRoutes.js';
import orderModel from "./models/orderModel.js";
import Stripe from 'stripe';



dotenv.config();
const port = process.env.PORT || 8000;

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors(
    {
        origin: `${process.env.FRONT_END_URL}`,
        credentials: true
    },
));
// Enable JSON parsing
app.use (cookieParser());



const endpointSecret = process.env.END_POINT_SECRET
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/pay/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
 
  
  
  let event;
  let data;
  let eventType;
  try {
   
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
   
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(err);
    return;
  }
  
      data = event.data.object;
      eventType = event.type;



      if (eventType === "checkout.session.completed") {
    
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
            
              const orderId =customer.metadata.orderID
              
              console.log(orderId)
              const order = await orderModel.findOne( { _id:orderId } );
          
              if (order) {
                order. paymentStatus = 'paid';
                // order.paidAt = Date.now()
                const updatedOrder = await order.save(); // Corrected here
                return updatedOrder;
              } else {
                throw new Error('Order not found');
              }
            } catch (error) {
              console.error('Error updating order:', error.message); // Improved error logging
              throw error; // Rethrow the error for handling in the caller function
            }
          })
          .catch((err) => console.log(err.message));
        }
      // Return a 200 response to acknowledge receipt of the event
      response.send().end();
    });
          
      




// Middleware to parse JSON bodies
app.use(express.json());



// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Define routes for user-related operations
app.use('/api/users', userRoutes);


app. use ('/api/products',productRoutes);

app. use ('/api/shops',shopsRoutes);

app.use ('/api/orders',orderRoutes);

app.use('/api/payments', paymentRoutes);


// Default route
app.get('/', (req, res) => res.send('Server is ready'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));


