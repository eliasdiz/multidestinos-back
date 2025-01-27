import express from 'express'
import whatsapp from './whatsapp.js';
import plan from './plan.js'


const router = express.Router();

/* GET home page. */
router.get('/', (req,res) => { res .json({ message: 'servidor en linea'})});
router.use('/whatsapp',whatsapp)
router.use('/plan',plan)

export default router
