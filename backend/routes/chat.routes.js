import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { accessChats, addUserToGroupChats, createGroupChats, fetchChats, removeUserFromGroupChats, renameGroupChats } from '../controllers/chat.controllers.js';
const router = express.Router();

router.post('/', authenticate, accessChats)
router.get('/', authenticate, fetchChats)
router.post('/group', authenticate, createGroupChats)
router.patch('/renameGroup', authenticate, renameGroupChats)
router.patch('/addUserToGroup', authenticate, addUserToGroupChats)
router.patch('/removeUserFromGroup', authenticate, removeUserFromGroupChats)

export default router