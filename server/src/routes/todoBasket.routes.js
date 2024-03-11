import {
    CreatingBasket, deleteBasket,
    getBaskets
} from '../controllers/bigTodo.controllers.js'
import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/create').post(verifyJWT, CreatingBasket)    
router.route('/get').get(verifyJWT, getBaskets)    
router.route('/delete/:basketID').post(verifyJWT, deleteBasket)
export default router
