import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import userRoutes from './routes/user.routes.js';
dotenv.config()
const app = express();

app.use(cors())
app.use(express.json());
connectDB()

app.use('/api/user', userRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
