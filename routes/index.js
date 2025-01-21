import express from 'express'
import whatsapp from './whatsapp.js';


const router = express.Router();

/* GET home page. */
router.get('/', (req,res) => { res .json({ message: 'servidor en linea'})});
router.use('/whatsapp',whatsapp)

export default router
