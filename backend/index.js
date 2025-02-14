import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
dotenv.config()
const app = express();

app.use(cors())
app.use(express.json());
connectDB()

app.use('/v1/api/user', userRoutes)
app.use('/v1/api/chat', chatRoutes)
app.use('/v1/api/messages', messageRoutes)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
