import Chat from '../models/chat.models.js'
import User from '../models/user.models.js'

export const accessChats = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate('users', '-password')
        .populate('lastestMsg')

    isChat = await User.populate(isChat, {
        path: 'lastestMsg.sender',
        select: 'name email'
    })

    if (isChat.length > 0) {
        return res.json({ data: isChat });
    } else {
        let chatData = {
            chatName: 'sender',
            users: [req.user._id, userId],
            isGroupChat: false
        }
        try {
            const newChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: newChat._id })
                .populate('users', '-password')
                .populate('lastestMsg')


            return res.status(200).send({ data: fullChat });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

export const fetchChats = async (req, res) => {
    try {
        let chats = {}
        chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('lastestMsg')
            .populate('groupAdmin', '-password')
            .sort({ updatedAt: -1 })

        chats = await User.populate(chats, {
            path: 'lastestMsg.sender',
            select: 'name email'
        })

        return res.json({ data: chats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const createGroupChats = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: 'Users and chat name are required' });
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).json({ message: 'At least two users are required to create a group chat' });
    }

    users.push(req.user._id);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')

        return res.status(200).send({ data: fullGroupChat });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const renameGroupChats = async (req, res) => {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        return res.status(400).json({ message: 'Chat ID and chat name are required' });
    }
    try {
        const renamedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')

        if (!renamedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        return res.json({ data: renamedChat });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

}

export const addUserToGroupChats = async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        return res.status(400).json({ message: 'Chat ID and user ID are required' });
    }

    try {

        const existingUserAdded = await Chat.findOne({ _id: chatId, users: userId })

        if (existingUserAdded) {
            return res.status(400).json({ message: 'User is already in the chat' });
        }

        const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')


        if (!added) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.json({ data: added });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const removeUserFromGroupChats = async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        return res.status(400).json({ message: 'Chat ID and user ID are required' });
    }

    const userExists = await Chat.findOne({ _id: chatId, users: userId });

    if (!userExists) {
        return res.status(400).json({ message: 'User is not in the chat' });
    }

    try {
        const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')


        if (!removed) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.json({ data: removed });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}