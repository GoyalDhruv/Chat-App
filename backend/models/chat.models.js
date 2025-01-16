import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastestMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', ChatSchema)

export default Chat
