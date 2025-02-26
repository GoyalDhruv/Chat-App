import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
import { Server } from 'socket.io';
import http from 'http'

dotenv.config()
const app = express();

app.use(cors())
app.use(express.json());
connectDB()

app.use('/v1/api/user', userRoutes)
app.use('/v1/api/chat', chatRoutes)
app.use('/v1/api/messages', messageRoutes)
const PORT = process.env.PORT || 8080

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {

    socket.on('setup', (userData) => {
        socket.join(userData?.id)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing')
    })

    socket.on('stopped typing', (room) => {
        socket.in(room).emit('stopped typing')
    })

    socket.on('new message', (message) => {
        let chat = message.chat
        if (!chat.users) return console.log('Chat user not defined')


        chat.users.forEach((user) => {
            if (user._id === message.sender?._id) return;
            socket.in(user._id).emit('message received', message)
        })
    })

    socket.off('setup', () => {
        console.log('Client disconnected')
        socket.leave(userData?._id)
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
