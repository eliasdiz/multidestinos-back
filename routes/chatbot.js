import express from 'express'
import controller from '../Controllers/Chatbot.js'


const { sendMessage} = controller



const router = express.Router()

    
router.post('/', sendMessage)

export default router