import {
    CreatingBasket
} from '../controllers/bigTodo.controllers.js'
import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/create').post(verifyJWT, CreatingBasket)    

export default router
