import express from 'express'
import controller from '../Controllers/Plan.js'


const { descripcion, getDescripcion, fechas, getFechas } = controller 

const router = express.Router()

router.put('/descripcion',descripcion)
router.get('/descripcion',getDescripcion)
router.put('/fecha',fechas)
router.get('/fecha',getFechas)


export default router