import express from 'express'
import controllers from '../Controllers/opciones.js'


const { crearActualizar, getOpciones } = controllers

const router = express.Router()

router.post('/',crearActualizar)
router.get('/',getOpciones)

export default router