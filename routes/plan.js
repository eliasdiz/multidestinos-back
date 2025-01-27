import express from 'express'
import controller from '../Controllers/Plan.js'


const { descripcion } = controller 

const router = express.Router()

router.put('/descripcion',descripcion)


export default router