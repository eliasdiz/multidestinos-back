import express from 'express'
import whatsapp from './whatsapp.js';
import plan from './plan.js'
import opciones from './opciones.js'


const router = express.Router();

/* GET home page. */
router.get('/', (req,res) => { res .json({ message: 'servidor en linea'})});
router.use('/whatsapp',whatsapp)
router.use('/plan',plan)
router.use('/opcion', opciones)

export default router
