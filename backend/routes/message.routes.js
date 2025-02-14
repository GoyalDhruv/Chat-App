import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { allMessage, sendMessage } from '../controllers/message.controllers.js';

const router = express.Router();

router.post('/', authenticate, sendMessage)
router.get('/:chatId', authenticate, allMessage)

export default router;