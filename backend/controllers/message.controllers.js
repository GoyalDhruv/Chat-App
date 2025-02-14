import Chat from '../models/chat.models.js';
import Message from '../models/message.models.js'
import User from '../models/user.models.js';

export const sendMessage = async (req, res) => {

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({ message: 'Content and chat ID are required' });
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.status(201).json({ message: 'Message sent successfully', data: message });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const allMessage = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat")

        res.status(200).json({ data: messages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}