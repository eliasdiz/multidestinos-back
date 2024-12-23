import express from 'express'
import chatbot from './chatbot.js'


const router = express.Router();

/* GET home page. */
router.get('/', (req,res) => { res .json({ message: 'servidor en linea'})});
router.use('/chatbot', chatbot)

export default router
