
import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/user.controllers.js'
import { authenticate } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', authenticate, getUser)

export default router