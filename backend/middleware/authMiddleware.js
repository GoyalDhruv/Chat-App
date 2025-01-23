import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import dotenv from 'dotenv'

dotenv.config()

export const authenticate = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: 'User not found' });
        req.user = user
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
