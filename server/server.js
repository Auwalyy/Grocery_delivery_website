import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

// Middleware configuration
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }));



// routes
app.get('/', (req, res) => res.send("API is running..."));
app.use('/api/user', userRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});