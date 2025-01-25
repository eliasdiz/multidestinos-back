import express from 'express'
import controller from '../Controllers/auth.js'

const { sesion } = controller

const router = express.Router()

router.get('/auth',sesion)

export default router