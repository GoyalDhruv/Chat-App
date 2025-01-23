import User from '../models/user.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword, pic });

        res.status(201).json({
            data: {
                name: user?.name,
                email: user?.email,
                pic: user?.pic,
                id: user._id
            },
            message: 'User registered successfully'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.json({
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token
            },
            message: 'User logged in successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getUser = async (req, res) => {
    try {
        const user=req.user
        const keyword = req.query.search;
        let filter = {};
        if (keyword) {
            filter = {
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { email: { $regex: keyword, $options: "i" } }
                ]
            };
        }
        const users = await User.find(filter).find({_id: { $ne: user._id }});
        res.json({ data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}