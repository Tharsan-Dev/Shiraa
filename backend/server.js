import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shopsRoutes from "./routes/shopsRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";



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

// Middleware to parse JSON bodies
app.use(express.json());



// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Define routes for user-related operations
app.use('/api/users', userRoutes);


app. use ('/api/products',productRoutes);

app. use ('/api/shops',shopsRoutes);



// Default route
app.get('/', (req, res) => res.send('Server is ready'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));


