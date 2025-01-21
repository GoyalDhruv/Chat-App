
import express from 'express'
import { registerUser } from '../controllers/user.controllers.js'
const router = express.Router()

router.post('/login', registerUser)
router.post('/register', registerUser)

export default router