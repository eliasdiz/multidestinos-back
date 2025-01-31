import express from 'express'
import controllers from '../Controllers/opciones.js'


const { crearActualizar } = controllers

const router = express.Router()

router.post('/',crearActualizar)

export default router