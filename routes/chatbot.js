import express from 'express'
import controller from '../Controllers/Chatbot.js'

const { chat } = controller


const router = express.Router()

router.post('/', chat)

export default router